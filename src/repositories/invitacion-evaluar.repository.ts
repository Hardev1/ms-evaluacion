import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {InvitacionEvaluar, InvitacionEvaluarRelations, Jurado, Solicitud, EstadoInvitacion} from '../models';
import {JuradoRepository} from './jurado.repository';
import {SolicitudRepository} from './solicitud.repository';
import {EstadoInvitacionRepository} from './estado-invitacion.repository';

export class InvitacionEvaluarRepository extends DefaultCrudRepository<
  InvitacionEvaluar,
  typeof InvitacionEvaluar.prototype.id,
  InvitacionEvaluarRelations
> {

  public readonly pertenece_a: BelongsToAccessor<Jurado, typeof InvitacionEvaluar.prototype.id>;

  public readonly tiene_una: BelongsToAccessor<Solicitud, typeof InvitacionEvaluar.prototype.id>;

  public readonly estado_invitacion: BelongsToAccessor<EstadoInvitacion, typeof InvitacionEvaluar.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('JuradoRepository') protected juradoRepositoryGetter: Getter<JuradoRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('EstadoInvitacionRepository') protected estadoInvitacionRepositoryGetter: Getter<EstadoInvitacionRepository>,
  ) {
    super(InvitacionEvaluar, dataSource);
    this.estado_invitacion = this.createBelongsToAccessorFor('estado_invitacion', estadoInvitacionRepositoryGetter,);
    this.registerInclusionResolver('estado_invitacion', this.estado_invitacion.inclusionResolver);
    this.tiene_una = this.createBelongsToAccessorFor('tiene_una', solicitudRepositoryGetter,);
    this.registerInclusionResolver('tiene_una', this.tiene_una.inclusionResolver);
    this.pertenece_a = this.createBelongsToAccessorFor('pertenece_a', juradoRepositoryGetter,);
    this.registerInclusionResolver('pertenece_a', this.pertenece_a.inclusionResolver);
  }
}
