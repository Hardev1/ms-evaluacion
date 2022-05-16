import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Solicitud} from '../models';
import {
  InvitacionEvaluarRepository, ProponenteRepository, SolicitudProponenteRepository, SolicitudRepository
} from '../repositories';
import {NotificacionesService} from '../services';


export class SolicitudController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
    @repository(SolicitudProponenteRepository)
    public solicitudProponenteRepository: SolicitudProponenteRepository,
    @repository(ProponenteRepository)
    public proponenteRepository: ProponenteRepository,
    @repository(InvitacionEvaluarRepository)
    public invitacionRepository: InvitacionEvaluarRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
  ) { }

  @authenticate("Administrador")
  @post('/crear-solicitud')
  @response(200, {
    description: 'Solicitud model instance',
    content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitud',
            exclude: ['id'],
          }),
        },
      },
    })
    solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud | undefined> {
    let solicitudRepetida = await this.solicitudRepository.findOne({
      where: {
        nombre_solicitud: solicitud.nombre_solicitud,
        id_tipo_solicitud: solicitud.id_tipo_solicitud,
        id_linea_investigacion: solicitud.id_linea_investigacion,
        id_modalidad: solicitud.id_modalidad,
      },
    });
    if (!solicitudRepetida) {
      solicitud.id_estado_solicitud = 2;
      return this.solicitudRepository.create(solicitud);
    } //Se debe configurar cual es el proponente que hace la solicitud repetida
    /* let solicitudProponente = await this.solicitudProponenteRepository.findOne({
      where: {id_solicitud: solicitudRepetida.id},
    });
    let proponente = await this.proponenteRepository.findById(
      solicitudProponente?.id_solicitud,
    ) */
    else {
      solicitud.id_estado_solicitud = 4;
      await this.solicitudRepository.save(solicitud);
      /* let correo = new NotificacionCorreo();
    correo.destinatario = proponente.email;
    correo.asunto = Keys.asuntoSolicitudExistente;
    correo.mensaje = `${Keys.saludo}, <b> ${proponente.primer_nombre}</b>: <br> ${Keys.mensajeSollicitudExitente1} <strong>${solicitud.nombre_solicitud}</strong>
          ${Keys.mensajeSollicitudExitente2}`;
    this.servicioNotificaciones.EnviarCorreo(correo); */
      return solicitud;
    }
  }

  @authenticate("Administrador", "Auxiliar", "Evaluador")
  @get('/solicituds/count')
  @response(200, {
    description: 'Solicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Solicitud) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.count(where);
  }

  @authenticate("Administrador", "Auxiliar", "Evaluador")
  @get('/solicitud')
  @response(200, {
    description: 'Array of Solicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Solicitud, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Solicitud) filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.solicitudRepository.find(filter);
  }

  @authenticate("Administrador")
  @patch('/solicituds')
  @response(200, {
    description: 'Solicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Solicitud,
    @param.where(Solicitud) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.updateAll(solicitud, where);
  }

  @authenticate("Administrador")
  @get('/solicituds/{id}')
  @response(200, {
    description: 'Solicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Solicitud, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Solicitud, {exclude: 'where'})
    filter?: FilterExcludingWhere<Solicitud>,
  ): Promise<Solicitud> {
    return this.solicitudRepository.findById(id, filter);
  }

  @authenticate("Administrador")
  @patch('/solicituds/{id}')
  @response(204, {
    description: 'Solicitud PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Solicitud,
  ): Promise<void> {
    await this.solicitudRepository.updateById(id, solicitud);
  }

  @authenticate("Administrador")
  @put('/solicituds/{id}')
  @response(204, {
    description: 'Solicitud PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() solicitud: Solicitud,
  ): Promise<void> {
    await this.solicitudRepository.replaceById(id, solicitud);
  }

  @authenticate("Administrador")
  @del('/solicituds/{id}')
  @response(204, {
    description: 'Solicitud DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.solicitudRepository.deleteById(id);
  }
}
