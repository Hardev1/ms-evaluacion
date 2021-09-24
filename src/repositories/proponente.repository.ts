import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Proponente, ProponenteRelations, Solicitud, SolicitudProponente, TipoVinculacion} from '../models';
import {SolicitudProponenteRepository} from './solicitud-proponente.repository';
import {SolicitudRepository} from './solicitud.repository';
import {TipoVinculacionRepository} from './tipo-vinculacion.repository';

export class ProponenteRepository extends DefaultCrudRepository<
  Proponente,
  typeof Proponente.prototype.id,
  ProponenteRelations
> {

  public readonly tiene_muchas: HasManyThroughRepositoryFactory<Solicitud, typeof Solicitud.prototype.id,
          SolicitudProponente,
          typeof Proponente.prototype.id
        >;

  public readonly tiene_un: BelongsToAccessor<TipoVinculacion, typeof Proponente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudProponenteRepository') protected solicitudProponenteRepositoryGetter: Getter<SolicitudProponenteRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('TipoVinculacionRepository') protected tipoVinculacionRepositoryGetter: Getter<TipoVinculacionRepository>,
  ) {
    super(Proponente, dataSource);
    this.tiene_un = this.createBelongsToAccessorFor('tiene_un', tipoVinculacionRepositoryGetter,);
    this.registerInclusionResolver('tiene_un', this.tiene_un.inclusionResolver);
    this.tiene_muchas = this.createHasManyThroughRepositoryFactoryFor('tiene_muchas', solicitudRepositoryGetter, solicitudProponenteRepositoryGetter,);
    this.registerInclusionResolver('tiene_muchas', this.tiene_muchas.inclusionResolver);
  }
}
