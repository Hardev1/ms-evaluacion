import { service } from '@loopback/core';
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
import { ResultadoEvaluacion, NotificacionCorreo } from '../models';
import {
  ResultadoEvaluacionRepository,
  InvitacionEvaluarRepository,
  SolicitudProponenteRepository,
  ProponenteRepository,
  SolicitudRepository,
  EstadoSolicitudRepository
} from '../repositories';
import { Keys } from '../config/keys';
import { NotificacionesService } from '../services';
import { authenticate } from '@loopback/authentication';

@authenticate("Administrador", "Evaluador")
export class ResultadoEvaluacionController {
  constructor(
    @repository(ResultadoEvaluacionRepository)
    public resultadoEvaluacionRepository: ResultadoEvaluacionRepository,
    @repository(InvitacionEvaluarRepository)
    public invitacionEvaluarRepository: InvitacionEvaluarRepository,
    @repository(SolicitudProponenteRepository)
    public solicitudProponenteRepository: SolicitudProponenteRepository,
    @repository(ProponenteRepository)
    public proponenteRepository: ProponenteRepository,
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
    @repository(EstadoSolicitudRepository)
    public estadoSolicitudRepository: EstadoSolicitudRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
  ) { }

  @post('/resultado-evaluacion')
  @response(200, {
    description: 'ResultadoEvaluacion model instance',
    content: {
      'application/json': { schema: getModelSchemaRef(ResultadoEvaluacion) },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResultadoEvaluacion, {
            title: 'NewResultadoEvaluacion',
            exclude: ['id'],
          }),
        },
      },
    })
    resultadoEvaluacion: Omit<ResultadoEvaluacion, 'id'>,
  ): Promise<ResultadoEvaluacion> {
    let fechaActual = new Date().toISOString();
    resultadoEvaluacion.fecha = fechaActual;
    let resultado = this.resultadoEvaluacionRepository.create(resultadoEvaluacion);
    //Se hacen varias consultas para encontrar la invitacion y poder cambiarle el estado
    let invitacionEvaluar = await this.invitacionEvaluarRepository.findById(
      resultadoEvaluacion.id_invitacion_evaluar,
    );
    invitacionEvaluar.id_estado_invitacion = 4;
    await this.invitacionEvaluarRepository.save(invitacionEvaluar)
    /*let solicitudProponente = await this.solicitudProponenteRepository.findOne({
      where: {id_solicitud: invitacionEvaluar.id_solicitud},
    });
    let proponente = await this.proponenteRepository.findById(
      solicitudProponente?.id_proponente,
    );
     let correo = new NotificacionCorreo();
    correo.destinatario = proponente.email;
    correo.asunto = Keys.asuntoResultado;
    correo.mensaje = `${Keys.saludo}, <b> ${proponente.primer_nombre}</b>: <br> ${Keys.mensajeResultado1} <strong>${solicitud.nombre_solicitud}</strong> 
          ${Keys.mensajeResultado2} ${resultadoEvaluacion.descripcion}`;
    this.servicioNotificaciones.EnviarCorreo(correo); */
    return resultado;
  }

  @get('/resultado-evaluacion/count')
  @response(200, {
    description: 'ResultadoEvaluacion model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(ResultadoEvaluacion) where?: Where<ResultadoEvaluacion>,
  ): Promise<Count> {
    return this.resultadoEvaluacionRepository.count(where);
  }

  @get('/resultado-evaluacion')
  @response(200, {
    description: 'Array of ResultadoEvaluacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ResultadoEvaluacion, {
            includeRelations: true,
          }),
        },
      },
    },
  })
  async find(
    @param.filter(ResultadoEvaluacion) filter?: Filter<ResultadoEvaluacion>,
  ): Promise<ResultadoEvaluacion[]> {
    return this.resultadoEvaluacionRepository.find(filter);
  }

  @get('/resultado-evaluacion-asignados')
  @response(200, {
    description: 'Array of ResultadoEvaluacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ResultadoEvaluacion, {
            includeRelations: true,
          }),
        },
      },
    },
  })
  async encontrarAsignados(
    @param.filter(ResultadoEvaluacion) filter?: Filter<ResultadoEvaluacion>,
  ): Promise<ResultadoEvaluacion[]> {
    return this.resultadoEvaluacionRepository.find(filter);
  }

  @patch('/resultado-evaluacion')
  @response(200, {
    description: 'ResultadoEvaluacion PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResultadoEvaluacion, { partial: true }),
        },
      },
    })
    resultadoEvaluacion: ResultadoEvaluacion,
    @param.where(ResultadoEvaluacion) where?: Where<ResultadoEvaluacion>,
  ): Promise<Count> {
    return this.resultadoEvaluacionRepository.updateAll(
      resultadoEvaluacion,
      where,
    );
  }

  @get('/resultado-evaluacion/{id}')
  @response(200, {
    description: 'ResultadoEvaluacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ResultadoEvaluacion, {
          includeRelations: true,
        }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ResultadoEvaluacion, { exclude: 'where' })
    filter?: FilterExcludingWhere<ResultadoEvaluacion>,
  ): Promise<ResultadoEvaluacion> {
    return this.resultadoEvaluacionRepository.findById(id, filter);
  }

  @patch('/resultado-evaluacion/{id}')
  @response(204, {
    description: 'ResultadoEvaluacion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResultadoEvaluacion, { partial: true }),
        },
      },
    })
    resultadoEvaluacion: ResultadoEvaluacion,
  ): Promise<void> {
    await this.resultadoEvaluacionRepository.updateById(
      id,
      resultadoEvaluacion,
    );
  }

  @put('/resultado-evaluacion/{id}')
  @response(204, {
    description: 'ResultadoEvaluacion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() resultadoEvaluacion: ResultadoEvaluacion,
  ): Promise<void> {
    await this.resultadoEvaluacionRepository.replaceById(
      id,
      resultadoEvaluacion,
    );
  }

  @del('/resultado-evaluacion/{id}')
  @response(204, {
    description: 'ResultadoEvaluacion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.resultadoEvaluacionRepository.deleteById(id);
  }
}
