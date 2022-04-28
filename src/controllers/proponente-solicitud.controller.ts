import { authenticate } from '@loopback/authentication';
import { service } from '@loopback/core';
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
import { Keys } from '../config/keys';
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
import { NotificacionesService } from '../services';

//@authenticate("Administrador", "Auxiliar")
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
  ) { }

  @post('/proponentes/{id}/solicituds', {
    responses: {
      '200': {
        description: 'create a Solicitud model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Solicitud) } },
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
  ): Promise<Solicitud> {
    let solicitudProponente = this.proponenteRepository
      .tiene_muchas(id)
      .create(solicitud);
    return solicitudProponente;
  }

  @get('/solicitud-proponente')
  @response(200, {
    description: 'Array of SolicitudProponente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SolicitudProponente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SolicitudProponente) filter?: Filter<SolicitudProponente>,
  ): Promise<SolicitudProponente[]> {
    return this.solicitudProponenteRepository.find(filter);
  }

  // Punto 4
  @post('/solicitud-proponente', {
    responses: {
      '200': {
        description: 'create a Rol model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(SolicitudProponente) },
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
  ): Promise<SolicitudProponente | null | undefined> {
    let registroRepetido = await this.solicitudProponenteRepository.findOne({
      where: {
        id_proponente: datos.id_proponente,
        id_solicitud: datos.id_solicitud,
      },
    }); //Se consulta si hay ya un registro existente
    let registro;
    if (!registroRepetido) { //En caso de que no exista actualmente el registro, lo crea
      registro = await this.solicitudProponenteRepository.create(datos);
      let proponente = await this.proponenteRepository.findById(
        datos.id_proponente,
      );
      let solicitud = await this.solicitudRepository.findById(
        datos.id_solicitud,
      );
      //Se almacenan los datos en variables para luego usar los datos tanto de la solicitud como del proponente para enviar correo
      if (solicitud.id_estado_solicitud != 3) {
        let correo = new NotificacionCorreo();
        correo.destinatario = proponente.email;
        correo.asunto = Keys.asuntoSolicitudProponente;
        correo.mensaje = `${Keys.saludo}, <b> ${proponente.primer_nombre} ${proponente.primer_apellido}</b>: <br> ${Keys.mensaje1Solicitud} "${solicitud.nombre_solicitud}" ${Keys.mensaje2Solicitud} ${Keys.fechaFormat}
                          ${Keys.mensaje3Solicitud} "${solicitud.descripcion}" ${Keys.mensaje4Solicitud}`;
        //Se consume el servicio local, el cual consume el microservicio, y luego se retorna el registro
        this.servicioNotificaciones.EnviarCorreo(correo);
        return registro;
      }
      let solOriginal = await this.solicitudRepository.findOne({
        where: {
          nombre_solicitud: solicitud.nombre_solicitud,
          id_tipo_solicitud: solicitud.id_tipo_solicitud,
          id_linea_investigacion: solicitud.id_linea_investigacion,
          id_modalidad: solicitud.id_modalidad,
          id_estado_solicitud: 1,
        },
      })
      let solOriginal2 = await this.solicitudRepository.findOne({
        where: {
          nombre_solicitud: solicitud.nombre_solicitud,
          id_tipo_solicitud: solicitud.id_tipo_solicitud,
          id_linea_investigacion: solicitud.id_linea_investigacion,
          id_modalidad: solicitud.id_modalidad,
          id_estado_solicitud: 2,
        },
      })
      if (solOriginal) {
        registro.id_solicitud = solOriginal?.id
        await this.solicitudProponenteRepository.save(registro);
        await this.solicitudProponenteRepository.delete(solicitud);
        let correo = new NotificacionCorreo();
        correo.destinatario = proponente.email;
        correo.asunto = Keys.asuntoSolicitudProponente;
        correo.mensaje = `${Keys.saludo}, <b> ${proponente.primer_nombre} ${proponente.primer_apellido}</b>: <br> ${Keys.mensaje1Solicitud} "${solicitud.nombre_solicitud}" ${Keys.mensaje2Solicitud} ${Keys.fechaFormat}
                          ${Keys.mensaje3Solicitud} "${solicitud.descripcion}" ${Keys.mensajeSolRepetida}`;
        //Se consume el servicio local, el cual consume el microservicio, y luego se retorna el registro
        this.servicioNotificaciones.EnviarCorreo(correo);
        return registro;
      }
      else if (solOriginal2) {
        registro.id_solicitud = solOriginal2?.id
        await this.solicitudProponenteRepository.save(registro);
        await this.solicitudProponenteRepository.delete(solicitud);
        let correo = new NotificacionCorreo();
        correo.destinatario = proponente.email;
        correo.asunto = Keys.asuntoSolicitudProponente;
        correo.mensaje = `${Keys.saludo}, <b> ${proponente.primer_nombre} ${proponente.primer_apellido}</b>: <br> ${Keys.mensaje1Solicitud} "${solicitud.nombre_solicitud}" ${Keys.mensaje2Solicitud} ${Keys.fechaFormat}
                          ${Keys.mensaje3Solicitud} "${solicitud.descripcion}" ${Keys.mensajeSolRepetida}`;
        //Se consume el servicio local, el cual consume el microservicio, y luego se retorna el registro
        this.servicioNotificaciones.EnviarCorreo(correo);
        return registro;
      }
    }
    return registro;
  }

  @patch('/proponentes/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Proponente.Solicitud PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, { partial: true }),
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
        content: { 'application/json': { schema: CountSchema } },
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
