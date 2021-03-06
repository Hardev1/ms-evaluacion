import {authenticate} from '@loopback/authentication';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  EstadoSolicitud, Solicitud
} from '../models';
import {SolicitudRepository} from '../repositories';

@authenticate("Administrador")
export class SolicitudEstadoSolicitudController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/estado-solicitud', {
    responses: {
      '200': {
        description: 'EstadoSolicitud belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EstadoSolicitud)},
          },
        },
      },
    },
  })
  async getEstadoSolicitud(
    @param.path.number('id') id: typeof Solicitud.prototype.id,
  ): Promise<EstadoSolicitud> {
    return this.solicitudRepository.posee_un(id);
  }
}
