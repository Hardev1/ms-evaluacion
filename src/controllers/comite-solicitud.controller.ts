import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
  response
} from '@loopback/rest';
import {
  Comite, Solicitud, SolicitudComite
} from '../models';
import {ComiteRepository, SolicitudComiteRepository} from '../repositories';

@authenticate("Administrador")
export class ComiteSolicitudController {
  constructor(
    @repository(ComiteRepository) protected comiteRepository: ComiteRepository,
    @repository(SolicitudComiteRepository) protected solicitudComiteRepository: SolicitudComiteRepository,
  ) { }

  @get('/comites/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Array of Comite has many Solicitud through SolicitudComite',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.comiteRepository.posee_muchos(id).find(filter);
  }

  @post('/comites/{id}/solicituds', {
    responses: {
      '200': {
        description: 'create a Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Comite.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInComite',
            exclude: ['id'],
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    return this.comiteRepository.posee_muchos(id).create(solicitud);
  }

  @patch('/comites/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Comite.Solicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Partial<Solicitud>,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.comiteRepository.posee_muchos(id).patch(solicitud, where);
  }

  @del('/comites/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Comite.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.comiteRepository.posee_muchos(id).delete(where);
  }

  @get('/solicitud-comite')
  @response(200, {
    description: 'Array of solicitudComite model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SolicitudComite, {includeRelations: true}),
        },
      },
    },
  })
  async encontrar(
    @param.filter(SolicitudComite) filter?: Filter<SolicitudComite>,
  ): Promise<SolicitudComite[]> {
    return this.solicitudComiteRepository.find(filter);
  }
}
