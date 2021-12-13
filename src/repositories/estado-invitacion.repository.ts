import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {EstadoInvitacion, EstadoInvitacionRelations} from '../models';

export class EstadoInvitacionRepository extends DefaultCrudRepository<
  EstadoInvitacion,
  typeof EstadoInvitacion.prototype.id,
  EstadoInvitacionRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(EstadoInvitacion, dataSource);
  }
}
