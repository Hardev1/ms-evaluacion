import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ResultadoEvaluacion, ResultadoEvaluacionRelations, InvitacionEvaluar} from '../models';
import {InvitacionEvaluarRepository} from './invitacion-evaluar.repository';

export class ResultadoEvaluacionRepository extends DefaultCrudRepository<
  ResultadoEvaluacion,
  typeof ResultadoEvaluacion.prototype.id,
  ResultadoEvaluacionRelations
> {

  public readonly tiene_una: BelongsToAccessor<InvitacionEvaluar, typeof ResultadoEvaluacion.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('InvitacionEvaluarRepository') protected invitacionEvaluarRepositoryGetter: Getter<InvitacionEvaluarRepository>,
  ) {
    super(ResultadoEvaluacion, dataSource);
    this.tiene_una = this.createBelongsToAccessorFor('tiene_una', invitacionEvaluarRepositoryGetter,);
    this.registerInclusionResolver('tiene_una', this.tiene_una.inclusionResolver);
  }
}
