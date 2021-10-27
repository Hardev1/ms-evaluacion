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
import {Configuracion} from '../llaves/config';
import {
  AceptarSolicitudes,
  InvitacionEvaluar,
  InvitacionEvaluarConceptual,
  NotificacionCorreo,
} from '../models';
import {InvitacionEvaluarRepository, JuradoRepository} from '../repositories';
const createHash = require('hash-generator');

export class InvitacionEvaluarController {
  constructor(
    @repository(InvitacionEvaluarRepository)
    public invitacionEvaluarRepository: InvitacionEvaluarRepository,
    @repository(JuradoRepository)
    public juradoRepository: JuradoRepository,
  ) {}

  @post('/invitacion-evaluar')
  @response(200, {
    description: 'InvitacionEvaluar model instance',
    content: {
      'application/json': {schema: getModelSchemaRef(InvitacionEvaluar)},
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvitacionEvaluar, {
            title: 'NewInvitacionEvaluar',
            exclude: ['id'],
          }),
        },
      },
    })
    invitacionEvaluar: Omit<InvitacionEvaluar, 'id'>,
  ): Promise<InvitacionEvaluar> {
    return this.invitacionEvaluarRepository.create(invitacionEvaluar);
  }

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
    invitacionEvaluarConceptual.jurados.forEach(value => {
      invitacionEvaluarConceptual.solicitudes.forEach(async value2 => {
        let invitacionEvaluar = new InvitacionEvaluar();
        invitacionEvaluar.id_jurado = value;
        invitacionEvaluar.id_solicitud = value2;
        invitacionEvaluar.estado_invitacion =
          invitacionEvaluarConceptual.estado_invitacion;
        invitacionEvaluar.fecha_invitacion =
          invitacionEvaluarConceptual.fecha_invitacion;
        invitacionEvaluar.fecha_respuesta =
          invitacionEvaluarConceptual.fecha_respuesta;
        let temporal =
          this.invitacionEvaluarRepository.create(invitacionEvaluar);
        let jurado = await this.juradoRepository.findOne({
          where: {id: value},
        }); //encontrar cada jurado con el que se envia la solicitud para evaluar y enviarle correo c/a
        let correo = new NotificacionCorreo();
        if (jurado?.email) {
          correo.destinatario = jurado.email;
          correo.asunto = Configuracion.asuntoSolicitudProponente;
          /* correo.mensaje = `${Configuracion.saludo}, <b> ${jurado.nombre}</b>: <br> ${Configuracion.mensaje1} "${solicitud.nombre_solicitud}" ${Configuracion.mensaje2} ${Configuracion.fechaFormat}
     ${Configuracion.mensaje3} "${solicitud.descripcion}" ${Configuracion.mensaje4}`;
          //Hacer el link para aceptar o rechazar solicitud para el jurado, cómo generar un link unico?
          this.servicioNotificaciones.EnviarCorreo(correo); */
        }
      });
    });
    return invitacionEvaluarConceptual;
  }

  @get('/invitacion-evaluar/count')
  @response(200, {
    description: 'InvitacionEvaluar model count',
    content: {'application/json': {schema: CountSchema}},
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
          items: getModelSchemaRef(InvitacionEvaluar, {includeRelations: true}),
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
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvitacionEvaluar, {partial: true}),
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
        schema: getModelSchemaRef(InvitacionEvaluar, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(InvitacionEvaluar, {exclude: 'where'})
    filter?: FilterExcludingWhere<InvitacionEvaluar>,
  ): Promise<InvitacionEvaluar> {
    return this.invitacionEvaluarRepository.findById(id, filter);
  }

  @patch('/invitacion-evaluar/{id}')
  @response(204, {
    description: 'InvitacionEvaluar PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvitacionEvaluar, {partial: true}),
        },
      },
    })
    invitacionEvaluar: InvitacionEvaluar,
  ): Promise<void> {
    await this.invitacionEvaluarRepository.updateById(id, invitacionEvaluar);
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
      where: {id: aceptarSolicitudes.id_solicitud},
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
