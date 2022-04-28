import { authenticate } from '@loopback/authentication';
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
import {JuradoLineaInvestigacion} from '../models';
import {JuradoLineaInvestigacionRepository} from '../repositories';

//@authenticate("Administrador", "Auxiliar")
export class JuradoLineaInvestigacionController {
  constructor(
    @repository(JuradoLineaInvestigacionRepository)
    public juradoLineaInvestigacionRepository : JuradoLineaInvestigacionRepository,
  ) {}

  @post('/jurado-linea-investigacion')
  @response(200, {
    description: 'JuradoLineaInvestigacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(JuradoLineaInvestigacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JuradoLineaInvestigacion, {
            title: 'NewJuradoLineaInvestigacion',
            exclude: ['id'],
          }),
        },
      },
    })
    juradoLineaInvestigacion: Omit<JuradoLineaInvestigacion, 'id'>,
  ): Promise<JuradoLineaInvestigacion> {
    return this.juradoLineaInvestigacionRepository.create(juradoLineaInvestigacion);
  }

  @get('/jurado-linea-investigacion/count')
  @response(200, {
    description: 'JuradoLineaInvestigacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(JuradoLineaInvestigacion) where?: Where<JuradoLineaInvestigacion>,
  ): Promise<Count> {
    return this.juradoLineaInvestigacionRepository.count(where);
  }

  @get('/jurado-linea-investigacion')
  @response(200, {
    description: 'Array of JuradoLineaInvestigacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(JuradoLineaInvestigacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(JuradoLineaInvestigacion) filter?: Filter<JuradoLineaInvestigacion>,
  ): Promise<JuradoLineaInvestigacion[]> {
    return this.juradoLineaInvestigacionRepository.find(filter);
  }

  @patch('/jurado-linea-investigacion')
  @response(200, {
    description: 'JuradoLineaInvestigacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JuradoLineaInvestigacion, {partial: true}),
        },
      },
    })
    juradoLineaInvestigacion: JuradoLineaInvestigacion,
    @param.where(JuradoLineaInvestigacion) where?: Where<JuradoLineaInvestigacion>,
  ): Promise<Count> {
    return this.juradoLineaInvestigacionRepository.updateAll(juradoLineaInvestigacion, where);
  }

  @get('/jurado-linea-investigacion/{id}')
  @response(200, {
    description: 'JuradoLineaInvestigacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(JuradoLineaInvestigacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(JuradoLineaInvestigacion, {exclude: 'where'}) filter?: FilterExcludingWhere<JuradoLineaInvestigacion>
  ): Promise<JuradoLineaInvestigacion> {
    return this.juradoLineaInvestigacionRepository.findById(id, filter);
  }

  @patch('/jurado-linea-investigacion/{id}')
  @response(204, {
    description: 'JuradoLineaInvestigacion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JuradoLineaInvestigacion, {partial: true}),
        },
      },
    })
    juradoLineaInvestigacion: JuradoLineaInvestigacion,
  ): Promise<void> {
    await this.juradoLineaInvestigacionRepository.updateById(id, juradoLineaInvestigacion);
  }

  @put('/jurado-linea-investigacion/{id}')
  @response(204, {
    description: 'JuradoLineaInvestigacion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() juradoLineaInvestigacion: JuradoLineaInvestigacion,
  ): Promise<void> {
    await this.juradoLineaInvestigacionRepository.replaceById(id, juradoLineaInvestigacion);
  }

  @del('/jurado-linea-investigacion/{id}')
  @response(204, {
    description: 'JuradoLineaInvestigacion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.juradoLineaInvestigacionRepository.deleteById(id);
  }
}
