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
import {Gifs} from '../models';
import {GifsRepository} from '../repositories';

export class GifsController {
  constructor(
    @repository(GifsRepository)
    public gifsRepository : GifsRepository,
  ) {}

  @post('/gifs', {
    responses: {
      '200': {
        description: 'Gifs model instance',
        content: {'application/json': {schema: getModelSchemaRef(Gifs)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gifs, {
            title: 'NewGifs',
            exclude: ['id'],
          }),
        },
      },
    })
    gifs: Omit<Gifs, 'id'>,
  ): Promise<Gifs> {
    return this.gifsRepository.create(gifs);
  }

  @get('/gifs/count', {
    responses: {
      '200': {
        description: 'Gifs model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Gifs) where?: Where<Gifs>,
  ): Promise<Count> {
    return this.gifsRepository.count(where);
  }

  @get('/gifs', {
    responses: {
      '200': {
        description: 'Array of Gifs model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Gifs, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Gifs) filter?: Filter<Gifs>,
  ): Promise<Gifs[]> {
    return this.gifsRepository.find(filter);
  }

  @patch('/gifs', {
    responses: {
      '200': {
        description: 'Gifs PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gifs, {partial: true}),
        },
      },
    })
    gifs: Gifs,
    @param.where(Gifs) where?: Where<Gifs>,
  ): Promise<Count> {
    return this.gifsRepository.updateAll(gifs, where);
  }

  @get('/gifs/{id}', {
    responses: {
      '200': {
        description: 'Gifs model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Gifs, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Gifs, {exclude: 'where'}) filter?: FilterExcludingWhere<Gifs>
  ): Promise<Gifs> {
    return this.gifsRepository.findById(id, filter);
  }

  @patch('/gifs/{id}', {
    responses: {
      '204': {
        description: 'Gifs PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gifs, {partial: true}),
        },
      },
    })
    gifs: Gifs,
  ): Promise<void> {
    await this.gifsRepository.updateById(id, gifs);
  }

  @put('/gifs/{id}', {
    responses: {
      '204': {
        description: 'Gifs PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() gifs: Gifs,
  ): Promise<void> {
    await this.gifsRepository.replaceById(id, gifs);
  }

  @del('/gifs/{id}', {
    responses: {
      '204': {
        description: 'Gifs DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.gifsRepository.deleteById(id);
  }
}
