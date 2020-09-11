import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where,} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody,} from '@loopback/rest';
import {Layout, LayoutRelations} from '../models';
import {LayoutRepository} from '../repositories';

export class LayoutController {
    constructor(
        @repository(LayoutRepository)
        public layoutRepository: LayoutRepository,
    ) {
    }

    @post('/layouts', {
        responses: {
            '200': {
                description: 'Layout model instance',
                content: {'application/json': {schema: getModelSchemaRef(Layout)}},
            },
        },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Layout, {
                        title: 'NewLayout',
                        exclude: ['id'],
                    }),
                },
            },
        })
            layout: Omit<Layout, 'id'>,
    ): Promise<Layout> {
        return this.layoutRepository.create(layout);
    }

    @get('/layouts/count', {
        responses: {
            '200': {
                description: 'Layout model count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async count(
        @param.where(Layout) where?: Where<Layout>,
    ): Promise<Count> {
        return this.layoutRepository.count(where);
    }

    @get('/layouts', {
        responses: {
            '200': {
                description: 'Array of Layout model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(Layout, {includeRelations: true}),
                        },
                    },
                },
            },
        },
    })
    async find(
        @param.filter(Layout) filter?: Filter<Layout>,
    ): Promise<Layout[]> {
        return this.layoutRepository.find(filter);
    }

    @patch('/layouts', {
        responses: {
            '200': {
                description: 'Layout PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Layout, {partial: true}),
                },
            },
        })
            layout: Layout,
        @param.where(Layout) where?: Where<Layout>,
    ): Promise<Count> {
        return this.layoutRepository.updateAll(layout, where);
    }

    @get('/layouts/{id}', {
        responses: {
            '200': {
                description: 'Layout model instance',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(Layout, {includeRelations: true}),
                    },
                },
            },
        },
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(Layout, {exclude: 'where'}) filter?: FilterExcludingWhere<Layout>
    ): Promise<Layout> {
        return this.layoutRepository.findById(id, filter);
    }


    @put('/layouts/{id}', {
        responses: {
            '204': {
                description: 'Layout PUT success',
            },
        },
    })
    async replaceById(
        @param.path.number('id') id: number,
        @requestBody() layout: Layout,
    ): Promise<Layout & LayoutRelations> {
          await this.layoutRepository.replaceById(id, layout);
          return await this.layoutRepository.findById(id);


    }

    @put('/layouts/', {
        responses: {
            '204': {
                description: 'Layout PUT success',
            },
        },
    })
    async replaceAll(
        @requestBody() layout: Layout[],
    ): Promise<(Layout & LayoutRelations)[]> {
        let items = new Array<Layout>();
        await this.layoutRepository.find().then(lay => {
            let i = 0;
            lay.forEach(async item => {
                console.log(layout[i]);
                item.cols = layout[i].cols;
                item.rows = layout[i].rows;
                item.x = layout[i].x;
                item.y = layout[i].y;
                item.componentRef = layout[i].componentRef;
                i = i + 1;
                items.push(item);
                await this.layoutRepository.save(item);
            });
        }).catch(err => err);


        return items;

    }

    @del('/layouts/{id}', {
        responses: {
            '204': {
                description: 'Layout DELETE success',
            },
        },
    })
    async deleteById(@param.path.number('id') id: number): Promise<(Layout & LayoutRelations)[]> {
        await this.layoutRepository.deleteById(id);
        return this.layoutRepository.find();
    }
}
