import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  InvitacionEvaluar,
  EstadoInvitacion,
} from '../models';
import {InvitacionEvaluarRepository} from '../repositories';

export class InvitacionEvaluarEstadoInvitacionController {
  constructor(
    @repository(InvitacionEvaluarRepository)
    public invitacionEvaluarRepository: InvitacionEvaluarRepository,
  ) { }

  @get('/invitacion-evaluars/{id}/estado-invitacion', {
    responses: {
      '200': {
        description: 'EstadoInvitacion belonging to InvitacionEvaluar',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EstadoInvitacion)},
          },
        },
      },
    },
  })
  async getEstadoInvitacion(
    @param.path.number('id') id: typeof InvitacionEvaluar.prototype.id,
  ): Promise<EstadoInvitacion> {
    return this.invitacionEvaluarRepository.estado_invitacion(id);
  }
}
