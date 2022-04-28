import {service} from '@loopback/core';
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
import {Recordatorio, NotificacionCorreo} from '../models';
import {
  RecordatorioRepository,
  InvitacionEvaluarRepository,
  JuradoRepository,
  SolicitudRepository,
  ProponenteRepository,
} from '../repositories';
import {Keys} from '../config/keys';
import {NotificacionesService} from '../services';
import { authenticate } from '@loopback/authentication';

export class RecordatorioController {
  constructor(
    @repository(RecordatorioRepository)
    public recordatorioRepository: RecordatorioRepository,
    @repository(InvitacionEvaluarRepository)
    public invitacionEvaluarRepository: InvitacionEvaluarRepository,
    @repository(JuradoRepository)
    public juradoRepository: JuradoRepository,
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
    @repository(ProponenteRepository)
    public proponenteRepository: ProponenteRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
  ) {}

  @post('/recordatorio-correo/')
  @response(200, {
    description: 'Recordatorio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Recordatorio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recordatorio, {
            title: 'NewRecordatorio',
            exclude: ['id'],
          }),
        },
      },
    })
    recordatorio: Omit<Recordatorio, 'id'>,
  ): Promise<Recordatorio> {
    let fechaActual = new Date().toISOString();
    recordatorio.fecha = fechaActual;
    recordatorio.tipo_recordatorio = "Correo";
    let recordatorioCorreo = this.recordatorioRepository.create(recordatorio);
    let invitacion = await this.invitacionEvaluarRepository.findById(
      recordatorio.id_invitacion_evaluar,
    );
    let jurado = await this.juradoRepository.findById(invitacion.id_jurado);
    let solicitud = await this.solicitudRepository.findById(
      invitacion.id_solicitud,
    );
    let correo = new NotificacionCorreo();
    correo.destinatario = jurado.email;
    correo.asunto = `${Keys.asuntoRecordatorio} ${solicitud.nombre_solicitud}`;
    correo.mensaje = `${Keys.saludo}, <b> ${jurado.nombre}</b>: <br> ${Keys.MensajeRecordatorio}<br>`;
    //Para almacenar el hash, se crea nueva propiedad en invitacion-evaluar
    this.servicioNotificaciones.EnviarCorreo(correo);
    return recordatorioCorreo;
  }

  @post('/recordatorio-llamada/')
  @response(200, {
    description: 'Recordatorio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Recordatorio)}},
  })
  async crearRecordatorioLlamada(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recordatorio, {
            title: 'NewRecordatorio',
            exclude: ['id'],
          }),
        },
      },
    })
    recordatorio: Omit<Recordatorio, 'id'>,
  ): Promise<Recordatorio> {
    let fechaActual = new Date().toISOString();
    recordatorio.fecha = fechaActual;
    recordatorio.tipo_recordatorio = "Llamada";
    let recordatorioLlamada = this.recordatorioRepository.save(recordatorio);
    return recordatorioLlamada;
  }

  @get('/recordatorio/count')
  @response(200, {
    description: 'Recordatorio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Recordatorio) where?: Where<Recordatorio>,
  ): Promise<Count> {
    return this.recordatorioRepository.count(where);
  }

  @get('/recordatorio')
  @response(200, {
    description: 'Array of Recordatorio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Recordatorio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Recordatorio) filter?: Filter<Recordatorio>,
  ): Promise<Recordatorio[]> {
    return this.recordatorioRepository.find(filter);
  }

  @patch('/recordatorio')
  @response(200, {
    description: 'Recordatorio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recordatorio, {partial: true}),
        },
      },
    })
    recordatorio: Recordatorio,
    @param.where(Recordatorio) where?: Where<Recordatorio>,
  ): Promise<Count> {
    return this.recordatorioRepository.updateAll(recordatorio, where);
  }

  @get('/recordatorio/{id}')
  @response(200, {
    description: 'Recordatorio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Recordatorio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Recordatorio, {exclude: 'where'})
    filter?: FilterExcludingWhere<Recordatorio>,
  ): Promise<Recordatorio> {
    return this.recordatorioRepository.findById(id, filter);
  }

  @patch('/recordatorio/{id}')
  @response(204, {
    description: 'Recordatorio PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recordatorio, {partial: true}),
        },
      },
    })
    recordatorio: Recordatorio,
  ): Promise<void> {
    await this.recordatorioRepository.updateById(id, recordatorio);
  }

  @put('/recordatorio/{id}')
  @response(204, {
    description: 'Recordatorio PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() recordatorio: Recordatorio,
  ): Promise<void> {
    await this.recordatorioRepository.replaceById(id, recordatorio);
  }

  @del('/recordatorio/{id}')
  @response(204, {
    description: 'Recordatorio DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.recordatorioRepository.deleteById(id);
  }
}
