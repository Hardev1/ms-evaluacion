import { authenticate } from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
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
  response,
} from '@loopback/rest';
import {
Departamento,
ProponenteDepartamento,
Proponente,
} from '../models';
import {DepartamentoRepository, ProponenteDepartamentoRepository} from '../repositories';


//@authenticate("Administrador", "Auxiliar")
export class DepartamentoProponenteController {
  constructor(
    @repository(DepartamentoRepository) protected departamentoRepository: DepartamentoRepository,
    @repository(ProponenteDepartamentoRepository) protected ProponenteDepartamentoRepository: ProponenteDepartamentoRepository,
  ) { }

  
  @get('/departamentos/{id}/proponentes', {
    responses: {
      '200': {
        description: 'Array of Departamento has many Proponente through ProponenteDepartamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proponente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Proponente>,
  ): Promise<Proponente[]> {
    return this.departamentoRepository.tienen_muchos(id).find(filter);
  }

  @get('/departamento-proponente')
  @response(200, {
    description: 'Array of ProponenteDepartamento model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProponenteDepartamento, {includeRelations: true}),
        },
      },
    },
  })
  async encontrar(
    @param.filter(ProponenteDepartamento) filter?: Filter<ProponenteDepartamento>,
  ): Promise<ProponenteDepartamento[]> {
    return this.ProponenteDepartamentoRepository.find(filter);
  }

  @post('/departamentos/{id}/proponentes', {
    responses: {
      '200': {
        description: 'create a Proponente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proponente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Departamento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proponente, {
            title: 'NewProponenteInDepartamento',
            exclude: ['id'],
          }),
        },
      },
    }) proponente: Omit<Proponente, 'id'>,
  ): Promise<Proponente> {
    return this.departamentoRepository.tienen_muchos(id).create(proponente);
  }

  @patch('/departamentos/{id}/proponentes', {
    responses: {
      '200': {
        description: 'Departamento.Proponente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proponente, {partial: true}),
        },
      },
    })
    proponente: Partial<Proponente>,
    @param.query.object('where', getWhereSchemaFor(Proponente)) where?: Where<Proponente>,
  ): Promise<Count> {
    return this.departamentoRepository.tienen_muchos(id).patch(proponente, where);
  }

  @del('/departamentos/{id}/proponentes', {
    responses: {
      '200': {
        description: 'Departamento.Proponente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Proponente)) where?: Where<Proponente>,
  ): Promise<Count> {
    return this.departamentoRepository.tienen_muchos(id).delete(where);
  }
}
