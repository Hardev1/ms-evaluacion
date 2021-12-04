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
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import { Keys } from '../config/keys';
//import { Rol } from '../../../ms-usuario-rol/src/models/rol.model';
import {
  AceptarSolicitudes,
  InvitacionEvaluar,
  InvitacionEvaluarConceptual,
  NotificacionCorreo,
  Jurado,
} from '../models';
import {
  InvitacionEvaluarRepository,
  JuradoRepository,
  SolicitudRepository,
} from '../repositories';
import { NotificacionesService, CrearUsuarioJuradoService } from '../services';

export class InvitacionEvaluarController {
  constructor(
    @repository(InvitacionEvaluarRepository)
    public invitacionEvaluarRepository: InvitacionEvaluarRepository,
    @repository(JuradoRepository)
    public juradoRepository: JuradoRepository,
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
    @service(CrearUsuarioJuradoService)
    public crearUsuarioJuradoService: CrearUsuarioJuradoService,
  ) { }

  //Se crea todas las solicitudes necesarias para todos los jurados
  @post('/crear-invitacion-evaluar')
  @response(200, {
    description: 'InvitacionEvaluar model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(InvitacionEvaluarConceptual),
      },
    },
  })
  async createInvitacionesSolicitudes(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvitacionEvaluarConceptual, {
            title: 'NewInvitacionEvaluarConceptual',
            exclude: ['id'],
          }),
        },
      },
    })
    invitacionEvaluarConceptual: Omit<InvitacionEvaluarConceptual, 'id'>,
  ): Promise<InvitacionEvaluarConceptual> {
    let fechaActual = new Date().toISOString();
    invitacionEvaluarConceptual.jurados.forEach(value => {
      invitacionEvaluarConceptual.solicitudes.forEach(async value2 => {
        let invitacionEvaluar = new InvitacionEvaluar();
        invitacionEvaluar.id_jurado = value;
        invitacionEvaluar.id_solicitud = value2;
        invitacionEvaluar.fecha_invitacion =
          fechaActual;
        invitacionEvaluar.hash = Keys.hash;
        /* let temporal =
          this.invitacionEvaluarRepository.create(invitacionEvaluar); */
        let jurado = await this.juradoRepository.findOne({
          where: { id: value },
        }); //encontrar cada jurado con el que se envia la solicitud para evaluar y enviarle correo c/a
        let solicitud = await this.solicitudRepository.findOne({
          where: { id: value2 },
        });
        let correo = new NotificacionCorreo();
        if (jurado?.email) {
          //Se verifica que el jurado posea un email
          let invitacionGuardada = this.invitacionEvaluarRepository.save(invitacionEvaluar);
          correo.destinatario = jurado.email;
          correo.asunto = Keys.asuntoInvitacionEvaluar;
          correo.mensaje = `${Keys.saludo}, <b> ${jurado.nombre}</b>: <br> ${Keys.mensaje1InvitacionEvaluar} ${solicitud?.nombre_solicitud}. <br> 
          ${Keys.mensaje2InvitacionEvaluar} ${Keys.mensaje3InvitacionEvaluar} <a href="${Keys.enlace}/${(await invitacionGuardada).id}/${Keys.hash}" style="font-weight:bold;">Confirmar respuesta</a>`;
          //Para almacenar el hash, se crea nueva propiedad en invitacion-evaluar
          this.servicioNotificaciones.EnviarCorreo(correo);
        }
      });
    });
    return invitacionEvaluarConceptual;
  }

  @get('/invitacion-evaluar/count')
  @response(200, {
    // Humberto hable por meet
    description: 'InvitacionEvaluar model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(InvitacionEvaluar) where?: Where<InvitacionEvaluar>,
  ): Promise<Count> {
    return this.invitacionEvaluarRepository.count(where);
  }

  @get('/invitacion-evaluar')
  @response(200, {
    description: 'Array of InvitacionEvaluar model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InvitacionEvaluar, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(InvitacionEvaluar) filter?: Filter<InvitacionEvaluar>,
  ): Promise<InvitacionEvaluar[]> {
    return this.invitacionEvaluarRepository.find(filter);
  }

  @patch('/invitacion-evaluar')
  @response(200, {
    description: 'InvitacionEvaluar PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvitacionEvaluar, { partial: true }),
        },
      },
    })
    invitacionEvaluar: InvitacionEvaluar,
    @param.where(InvitacionEvaluar) where?: Where<InvitacionEvaluar>,
  ): Promise<Count> {
    return this.invitacionEvaluarRepository.updateAll(invitacionEvaluar, where);
  }

  @get('/invitacion-evaluar/{id}')
  @response(200, {
    description: 'InvitacionEvaluar model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(InvitacionEvaluar, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(InvitacionEvaluar, { exclude: 'where' })
    filter?: FilterExcludingWhere<InvitacionEvaluar>,
  ): Promise<InvitacionEvaluar> {
    return this.invitacionEvaluarRepository.findById(id, filter);
  }

  //Punto 5, cuando se acepta o rechace una invitación a evaluar
  @patch('/invitacion-evaluar-aceptada/{id}')
  @response(204, {
    description: 'InvitacionEvaluar PATCH success',
  })
  async aceptarInvitacion(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvitacionEvaluar, { partial: true }),
        },
      },
    })
    invitacionEvaluar: InvitacionEvaluar,
  ): Promise<InvitacionEvaluar | null> {
    let fechaActual = new Date().toISOString();
    let invitacion = await this.invitacionEvaluarRepository.findById(id);
    if (invitacionEvaluar.hash === invitacion.hash) {
      let juradoAceptado = await this.juradoRepository.findById(
        invitacion.id_jurado,
      );
      invitacion.estado_invitacion = 1;
      invitacion.fecha_respuesta = fechaActual;
      invitacion.observaciones = invitacionEvaluar.observaciones;
      await this.invitacionEvaluarRepository.save(invitacion);
      //llamar al otro microservicio para crearle el usuario y la contraseña al jurado que acepta
      await this.crearUsuarioJuradoService.CrearEvaluador(juradoAceptado);
      let solicitud = await this.solicitudRepository.findById(
        invitacionEvaluar.id_solicitud,
      );
      solicitud.id_estado_solicitud = 1;
      await this.solicitudRepository.save(solicitud);
      return invitacion;
    }
    //enviarle la notificacion del usuario y la contraseña, esto ubicado en user.controller.ts
    //enviarle a X rol la notificación de que X jurado aceptó calificar X solicitud
    ////let datos = new NotificacionCorreo();
    /* datos.destinatario = rol.email;
        datos.asunto = Keys.asuntoUsuarioCreado;
        datos.mensaje = `${Keys.saludo} ${user.nombre} <br>${Keys.mensajeUsuarioCreado} <br> ${clave}`;
        this.servicioNotificaciones.EnviarCorreo(datos); */
    return null;
  }

  @patch('/invitacion-evaluar-rechazada/{id}')
  @response(204, {
    description: 'InvitacionEvaluar PATCH success',
  })
  async rechazarInvitacion(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvitacionEvaluar, { partial: true }),
        },
      },
    })
    invitacionEvaluar: InvitacionEvaluar,
  ): Promise<InvitacionEvaluar> {
    let invitacion = await this.invitacionEvaluarRepository.findById(id);
    invitacion.fecha_respuesta = invitacionEvaluar.fecha_respuesta;
    invitacion.estado_invitacion = 2;
    invitacion.observaciones = invitacionEvaluar.observaciones;
    await this.invitacionEvaluarRepository.save(invitacion);
    return invitacion;
  }

  @put('/invitacion-evaluar/{id}')
  @response(204, {
    description: 'InvitacionEvaluar PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() invitacionEvaluar: InvitacionEvaluar,
  ): Promise<void> {
    await this.invitacionEvaluarRepository.replaceById(id, invitacionEvaluar);
  }
  //actualiza el estado de la invitación a calificar cuando abre el correo aceptar/rechazar
  @put('/cambiar-invitacion-evaluar/{id}')
  @response(204, {
    description: 'InvitacionEvaluar PUT success',
  })
  async cambiarInvit(
    @param.path.number('id') id: number,
    @requestBody() aceptarSolicitudes: AceptarSolicitudes,
  ): Promise<void> {
    let solicitud = await this.invitacionEvaluarRepository.findOne({
      where: { id: aceptarSolicitudes.id_solicitud },
    });
    if (solicitud) {
      if (aceptarSolicitudes.respuesta) {
        solicitud.estado_invitacion = 1;
      } else {
        solicitud.estado_invitacion = 2;
      }
      if (aceptarSolicitudes && aceptarSolicitudes.descripcion) {
        solicitud.observaciones = aceptarSolicitudes.descripcion;
      }
      await this.invitacionEvaluarRepository.replaceById(
        aceptarSolicitudes.id_solicitud,
        solicitud,
      );
    }
  }

  @del('/invitacion-evaluar/{id}')
  @response(204, {
    description: 'InvitacionEvaluar DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.invitacionEvaluarRepository.deleteById(id);
  }
}
