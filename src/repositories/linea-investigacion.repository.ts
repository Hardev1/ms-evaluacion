import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {LineaInvestigacion, LineaInvestigacionRelations, Jurado, JuradoLineaInvestigacion} from '../models';
import {JuradoLineaInvestigacionRepository} from './jurado-linea-investigacion.repository';
import {JuradoRepository} from './jurado.repository';

export class LineaInvestigacionRepository extends DefaultCrudRepository<
  LineaInvestigacion,
  typeof LineaInvestigacion.prototype.id,
  LineaInvestigacionRelations
> {

  public readonly tiene_un: HasManyThroughRepositoryFactory<Jurado, typeof Jurado.prototype.id,
          JuradoLineaInvestigacion,
          typeof LineaInvestigacion.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('JuradoLineaInvestigacionRepository') protected juradoLineaInvestigacionRepositoryGetter: Getter<JuradoLineaInvestigacionRepository>, @repository.getter('JuradoRepository') protected juradoRepositoryGetter: Getter<JuradoRepository>,
  ) {
    super(LineaInvestigacion, dataSource);
    this.tiene_un = this.createHasManyThroughRepositoryFactoryFor('tiene_un', juradoRepositoryGetter, juradoLineaInvestigacionRepositoryGetter,);
    this.registerInclusionResolver('tiene_un', this.tiene_un.inclusionResolver);
  }
}
