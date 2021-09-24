import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, TipoSolicitud, EstadoSolicitud, Modalidad, LineaInvestigacion} from '../models';
import {TipoSolicitudRepository} from './tipo-solicitud.repository';
import {EstadoSolicitudRepository} from './estado-solicitud.repository';
import {ModalidadRepository} from './modalidad.repository';
import {LineaInvestigacionRepository} from './linea-investigacion.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly tiene_un: BelongsToAccessor<TipoSolicitud, typeof Solicitud.prototype.id>;

  public readonly posee_un: BelongsToAccessor<EstadoSolicitud, typeof Solicitud.prototype.id>;

  public readonly pertenece_a: BelongsToAccessor<Modalidad, typeof Solicitud.prototype.id>;

  public readonly tiene_una: BelongsToAccessor<LineaInvestigacion, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TipoSolicitudRepository') protected tipoSolicitudRepositoryGetter: Getter<TipoSolicitudRepository>, @repository.getter('EstadoSolicitudRepository') protected estadoSolicitudRepositoryGetter: Getter<EstadoSolicitudRepository>, @repository.getter('ModalidadRepository') protected modalidadRepositoryGetter: Getter<ModalidadRepository>, @repository.getter('LineaInvestigacionRepository') protected lineaInvestigacionRepositoryGetter: Getter<LineaInvestigacionRepository>,
  ) {
    super(Solicitud, dataSource);
    this.tiene_una = this.createBelongsToAccessorFor('tiene_una', lineaInvestigacionRepositoryGetter,);
    this.registerInclusionResolver('tiene_una', this.tiene_una.inclusionResolver);
    this.pertenece_a = this.createBelongsToAccessorFor('pertenece_a', modalidadRepositoryGetter,);
    this.registerInclusionResolver('pertenece_a', this.pertenece_a.inclusionResolver);
    this.posee_un = this.createBelongsToAccessorFor('posee_un', estadoSolicitudRepositoryGetter,);
    this.registerInclusionResolver('posee_un', this.posee_un.inclusionResolver);
    this.tiene_un = this.createBelongsToAccessorFor('tiene_un', tipoSolicitudRepositoryGetter,);
    this.registerInclusionResolver('tiene_un', this.tiene_un.inclusionResolver);
  }
}
