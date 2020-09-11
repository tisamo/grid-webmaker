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
    requestBody, HttpErrors,
} from '@loopback/rest';
import {Socials, SocialsRelations} from '../models';
import {SocialsRepository} from '../repositories';

export class SocialsController {
    constructor(
        @repository(SocialsRepository)
        public socialsRepository: SocialsRepository,
    ) {
    }

    @post('/socials', {
        responses: {
            '200': {
                description: 'Socials model instance',
                content: {'application/json': {schema: getModelSchemaRef(Socials)}},
            },
        },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Socials, {
                        title: 'NewSocials',
                        exclude: ['id'],
                    }),
                },
            },
        })
            socials: Omit<Socials, 'id'>,
    ): Promise<any> {
        const filter = await this.socialsRepository.findOne({where: {name: socials.name}});

        if (filter != null) {
            let err = new HttpErrors.BadRequest(socials.name + ' social already exist');
            err.statusCode = 409;
            throw err;
        } else {

            await this.socialsRepository.create(socials);

            return await this.socialsRepository.find();
        }


    }

    @get('/socials/count', {
        responses: {
            '200': {
                description: 'Socials model count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async count(
        @param.where(Socials) where?: Where<Socials>,
    ): Promise<Count> {
        return this.socialsRepository.count(where);
    }

    @get('/socials', {
        responses: {
            '200': {
                description: 'Array of Socials model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(Socials, {includeRelations: true}),
                        },
                    },
                },
            },
        },
    })
    async find(
        @param.filter(Socials) filter?: Filter<Socials>,
    ): Promise<Socials[]> {
        return this.socialsRepository.find(filter);
    }

    @get('/socials/find-by-name/{name}', {
        responses: {
            '200': {
                description: 'Array of Socials model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(Socials, {includeRelations: true}),
                        },
                    },
                },
            },
        },
    })
    async findByName(
        @param.path.string('name') name: string,
    ): Promise<any> {
        return await this.socialsRepository.findOne({where: {name: name}});
    }

    @patch('/socials', {
        responses: {
            '200': {
                description: 'Socials PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Socials, {partial: true}),
                },
            },
        })
            socials: Socials,
        @param.where(Socials) where?: Where<Socials>,
    ): Promise<Count> {
        return this.socialsRepository.updateAll(socials, where);
    }

    @get('/socials/{id}', {
        responses: {
            '200': {
                description: 'Socials model instance',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(Socials, {includeRelations: true}),
                    },
                },
            },
        },
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(Socials, {exclude: 'where'}) filter?: FilterExcludingWhere<Socials>
    ): Promise<Socials> {
        return this.socialsRepository.findById(id, filter);
    }

    @patch('/socials/{id}', {
        responses: {
            '204': {
                description: 'Socials PATCH success',
            },
        },
    })
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Socials, {partial: true}),
                },
            },
        })
            socials: Socials,
    ): Promise<(Socials & SocialsRelations)[]> {
        await this.socialsRepository.updateById(id, socials);
        return await this.socialsRepository.find();
    }

    @put('/socials/{id}', {
        responses: {
            '204': {
                description: 'Socials PUT success',
            },
        },
    })
    async replaceById(
        @param.path.number('id') id: number,
        @requestBody() socials: Socials,
    ): Promise<void> {
        await this.socialsRepository.replaceById(id, socials);
    }

    @del('/socials/{id}', {
        responses: {
            '204': {
                description: 'Socials DELETE success',
            },
        },
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.socialsRepository.deleteById(id);
    }
}
