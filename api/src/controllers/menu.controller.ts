import {
    Count,
    CountSchema,
    Filter,
    FilterExcludingWhere,
    repository,
    Where,
} from '@loopback/repository';
import {
    post,
    param,
    get,
    getModelSchemaRef,
    patch,
    put,
    del,
    requestBody,
} from '@loopback/rest';
import {Design, DesignRelations, Menu, MenuRelations} from '../models';
import {MenuRepository} from '../repositories';

export class MenuController {
    constructor(
        @repository(MenuRepository)
        public menuRepository: MenuRepository,
    ) {
    }

    @post('/menus', {
        responses: {
            '200': {
                description: 'Menu model instance',
                content: {'application/json': {schema: getModelSchemaRef(Menu)}},
            },
        },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Menu, {
                        title: 'NewMenu',
                        exclude: ['id'],
                    }),
                },
            },
        })
            menu: Omit<Menu, 'id'>,
    ): Promise<Menu> {
        console.log(menu);
        return this.menuRepository.create(menu);
    }

    @get('/menus/count', {
        responses: {
            '200': {
                description: 'Menu model count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async count(
        @param.where(Menu) where?: Where<Menu>,
    ): Promise<Count> {
        return this.menuRepository.count(where);
    }

    @get('/menus/type/{type}', {
        responses: {
            '200': {
                description: 'Design model instance',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(Design, {includeRelations: true}),
                    },
                },
            },
        },
    })
    async findByType(
        @param.path.string('type') type: string,
        @param.filter(Menu, {exclude: 'where'}) filter?: FilterExcludingWhere<Design>
    ): Promise<(Menu & MenuRelations)[]> {

        return await this.menuRepository.find({
            where: {
                type: type,
            }
        });
    }

    @get('/menus', {
        responses: {
            '200': {
                description: 'Array of Menu model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(Menu, {includeRelations: true}),
                        },
                    },
                },
            },
        },
    })
    async find(
        @param.filter(Menu) filter?: Filter<Menu>,
    ): Promise<Menu[]> {
        return this.menuRepository.find(filter);
    }

    @patch('/menus', {
        responses: {
            '200': {
                description: 'Menu PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Menu, {partial: true}),
                },
            },
        })
            menu: Menu,
        @param.where(Menu) where?: Where<Menu>,
    ): Promise<Count> {
        return this.menuRepository.updateAll(menu, where);
    }

    @get('/menus/{id}', {
        responses: {
            '200': {
                description: 'Menu model instance',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(Menu, {includeRelations: true}),
                    },
                },
            },
        },
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(Menu, {exclude: 'where'}) filter?: FilterExcludingWhere<Menu>
    ): Promise<Menu> {
        return this.menuRepository.findById(id, filter);
    }

    @patch('/menus/{id}', {
        responses: {
            '204': {
                description: 'Menu PATCH success',
            },
        },
    })
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Menu, {partial: true}),
                },
            },
        })
            menu: Menu,
    ): Promise<void> {
        await this.menuRepository.updateById(id, menu);
    }

    @put('/menus/switch', {
        responses: {
            '204': {
                description: 'Menu PUT success',
            },
        },
    })
    async switchMenuItems(
        @requestBody() menu: any,
    ): Promise<(Menu & MenuRelations)[]> {

        const itemOne = await this.menuRepository.findById(menu.id1);
        const itemTwo = await this.menuRepository.findById(menu.id2);
        const pos0 = itemOne.name;
        const rout0 = itemOne.routerLink;
        itemOne.name = itemTwo.name;
        itemOne.routerLink = itemTwo.routerLink;
        itemTwo.routerLink = rout0;
        itemTwo.name = pos0;
        await this.menuRepository.save(itemOne);
        await this.menuRepository.save(itemTwo);
        let menutoSend = await this.menuRepository.find({
            where: {
                type: itemOne.type,
            }
        });


        return menutoSend;
    }

    @put('/menus/{id}', {
        responses: {
            '204': {
                description: 'Menu PUT success',
            },
        },
    })
    async replaceById(
        @param.path.number('id') id: number,
        @requestBody() menu: Menu,
    ): Promise<(Menu & MenuRelations)[]> {
        await this.menuRepository.replaceById(id, menu);
        return await this.menuRepository.find();
    }

    @del('/menus/{id}', {
        responses: {
            '204': {
                description: 'Menu DELETE success',
            },
        },
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.menuRepository.deleteById(id);
    }

    @put('/menus/headerMenu', {
        responses: {
            '204': {
                description: 'Menu PUT success',
            },
        },
    })
    async replaceHeader(
        @requestBody() menu: Menu[],
    ): Promise<(Menu & MenuRelations)[]> {
        console.log(menu);
        menu.forEach(async (menuItem) => {
            await this.menuRepository.replaceById(menuItem.id, menuItem)
        });
        return await this.menuRepository.find();
    }
}
