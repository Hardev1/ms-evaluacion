import {service} from '@loopback/core';
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
} from '@loopback/rest';
import {Configuracion} from '../llaves/config';
import {
  NotificacionCorreo,
  Proponente,
  Solicitud,
  SolicitudProponente,
} from '../models';
import {
  ProponenteRepository,
  SolicitudProponenteRepository,
  SolicitudRepository,
} from '../repositories';
import {NotificacionesService} from '../services';

export class ProponenteSolicitudController {
  constructor(
    @repository(ProponenteRepository)
    protected proponenteRepository: ProponenteRepository,
    @repository(SolicitudProponenteRepository)
    protected solicitudProponenteRepository: SolicitudProponenteRepository,
    @repository(SolicitudRepository)
    protected solicitudRepository: SolicitudRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
  ) {}

  @get('/proponentes/{id}/solicituds', {
    responses: {
      '200': {
        description:
          'Array of Proponente has many Solicitud through SolicitudProponente',
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
    return this.proponenteRepository.tiene_muchas(id).find(filter);
  }

  @post('/proponentes/{id}/solicituds', {
    responses: {
      '200': {
        description: 'create a Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Proponente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInProponente',
            exclude: ['id'],
          }),
        },
      },
    })
    solicitud: Omit<Solicitud, 'id'>,
    proponente: Omit<Proponente, 'id'>,
  ): Promise<Solicitud> {
    let solicitudProponente = this.proponenteRepository
      .tiene_muchas(id)
      .create(solicitud);

    /* let datos = new NotificacionCorreo();
    datos.destinatario = proponente.email;
    datos.asunto = Configuracion.asuntoUsuarioCreado;
    datos.mensaje = `${Configuracion.saludo} ${proponente.primer_nombre} <br>${Configuracion.mensajeUsuarioCreado}`;
    this.servicioNotificaciones.EnviarCorreo(datos); */
    return solicitudProponente;
  }

  @post('/solicitud-proponente', {
    responses: {
      '200': {
        description: 'create a Rol model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(SolicitudProponente)},
        },
      },
    },
  })
  async createUnUsuarioUnRol(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudProponente, {
            title: 'New',
            exclude: ['id'],
          }),
        },
      },
    })
    datos: Omit<SolicitudProponente, 'id'>,
    //proponente: Proponente
  ): Promise<SolicitudProponente | null | undefined> {
    let registroRepetido = await this.solicitudProponenteRepository.findOne({
      where: {
        id_proponente: datos.id_proponente,
        id_solicitud: datos.id_solicitud,
      },
    });
    let registro;
    if (!registroRepetido) {
      registro = await this.solicitudProponenteRepository.create(datos);
      let proponente = await this.proponenteRepository.findById(
        datos.id_proponente,
      );
      let solicitud = await this.solicitudRepository.findById(
        datos.id_solicitud,
      );

      let correo = new NotificacionCorreo();
      correo.destinatario = proponente.email;
      correo.asunto = Configuracion.asuntoSolicitudProponente;
      correo.mensaje = `${Configuracion.saludo}, <b> ${proponente.primer_nombre} ${proponente.primer_apellido}</b>: <br> ${Configuracion.mensaje1} "${solicitud.nombre_solicitud}" ${Configuracion.mensaje2} ${Configuracion.fechaFormat}
     ${Configuracion.mensaje3} "${solicitud.descripcion}" ${Configuracion.mensaje4}`;

      this.servicioNotificaciones.EnviarCorreo(correo);
      return registro;
    }

    return registro;
  }

  @patch('/proponentes/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Proponente.Solicitud PATCH success count',
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
    @param.query.object('where', getWhereSchemaFor(Solicitud))
    where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.proponenteRepository.tiene_muchas(id).patch(solicitud, where);
  }

  @del('/proponentes/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Proponente.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Solicitud))
    where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.proponenteRepository.tiene_muchas(id).delete(where);
  }
}
