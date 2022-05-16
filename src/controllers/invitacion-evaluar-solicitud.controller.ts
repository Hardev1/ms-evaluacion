import {authenticate} from '@loopback/authentication';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  InvitacionEvaluar,
  Solicitud
} from '../models';
import {InvitacionEvaluarRepository} from '../repositories';

@authenticate("Administrador")
export class InvitacionEvaluarSolicitudController {
  constructor(
    @repository(InvitacionEvaluarRepository)
    public invitacionEvaluarRepository: InvitacionEvaluarRepository,
  ) { }

  @get('/invitacion-evaluars/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Solicitud belonging to InvitacionEvaluar',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async getSolicitud(
    @param.path.number('id') id: typeof InvitacionEvaluar.prototype.id,
  ): Promise<Solicitud> {
    return this.invitacionEvaluarRepository.tiene_una(id);
  }
}
