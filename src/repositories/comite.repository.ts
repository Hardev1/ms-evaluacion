import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Comite, ComiteRelations, Solicitud, SolicitudComite} from '../models';
import {SolicitudComiteRepository} from './solicitud-comite.repository';
import {SolicitudRepository} from './solicitud.repository';

export class ComiteRepository extends DefaultCrudRepository<
  Comite,
  typeof Comite.prototype.id,
  ComiteRelations
> {

  public readonly posee_muchos: HasManyThroughRepositoryFactory<Solicitud, typeof Solicitud.prototype.id,
          SolicitudComite,
          typeof Comite.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudComiteRepository') protected solicitudComiteRepositoryGetter: Getter<SolicitudComiteRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Comite, dataSource);
    this.posee_muchos = this.createHasManyThroughRepositoryFactoryFor('posee_muchos', solicitudRepositoryGetter, solicitudComiteRepositoryGetter,);
    this.registerInclusionResolver('posee_muchos', this.posee_muchos.inclusionResolver);
  }
}
