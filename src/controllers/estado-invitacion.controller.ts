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
  response,
} from '@loopback/rest';
import {EstadoInvitacion} from '../models';
import {EstadoInvitacionRepository} from '../repositories';

export class EstadoInvitacionController {
  constructor(
    @repository(EstadoInvitacionRepository)
    public estadoInvitacionRepository : EstadoInvitacionRepository,
  ) {}

  @post('/estado-invitacion')
  @response(200, {
    description: 'EstadoInvitacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(EstadoInvitacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoInvitacion, {
            title: 'NewEstadoInvitacion',
            exclude: ['id'],
          }),
        },
      },
    })
    estadoInvitacion: Omit<EstadoInvitacion, 'id'>,
  ): Promise<EstadoInvitacion> {
    return this.estadoInvitacionRepository.create(estadoInvitacion);
  }

  @get('/estado-invitacion/count')
  @response(200, {
    description: 'EstadoInvitacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EstadoInvitacion) where?: Where<EstadoInvitacion>,
  ): Promise<Count> {
    return this.estadoInvitacionRepository.count(where);
  }

  @get('/estado-invitacion')
  @response(200, {
    description: 'Array of EstadoInvitacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EstadoInvitacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EstadoInvitacion) filter?: Filter<EstadoInvitacion>,
  ): Promise<EstadoInvitacion[]> {
    return this.estadoInvitacionRepository.find(filter);
  }

  @patch('/estado-invitacion')
  @response(200, {
    description: 'EstadoInvitacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoInvitacion, {partial: true}),
        },
      },
    })
    estadoInvitacion: EstadoInvitacion,
    @param.where(EstadoInvitacion) where?: Where<EstadoInvitacion>,
  ): Promise<Count> {
    return this.estadoInvitacionRepository.updateAll(estadoInvitacion, where);
  }

  @get('/estado-invitacion/{id}')
  @response(200, {
    description: 'EstadoInvitacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EstadoInvitacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EstadoInvitacion, {exclude: 'where'}) filter?: FilterExcludingWhere<EstadoInvitacion>
  ): Promise<EstadoInvitacion> {
    return this.estadoInvitacionRepository.findById(id, filter);
  }

  @patch('/estado-invitacion/{id}')
  @response(204, {
    description: 'EstadoInvitacion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoInvitacion, {partial: true}),
        },
      },
    })
    estadoInvitacion: EstadoInvitacion,
  ): Promise<void> {
    await this.estadoInvitacionRepository.updateById(id, estadoInvitacion);
  }

  @put('/estado-invitacion/{id}')
  @response(204, {
    description: 'EstadoInvitacion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() estadoInvitacion: EstadoInvitacion,
  ): Promise<void> {
    await this.estadoInvitacionRepository.replaceById(id, estadoInvitacion);
  }

  @del('/estado-invitacion/{id}')
  @response(204, {
    description: 'EstadoInvitacion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.estadoInvitacionRepository.deleteById(id);
  }
}
