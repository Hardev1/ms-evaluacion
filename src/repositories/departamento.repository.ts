import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Departamento, DepartamentoRelations, Facultad, Proponente, ProponenteDepartamento} from '../models';
import {FacultadRepository} from './facultad.repository';
import {ProponenteDepartamentoRepository} from './proponente-departamento.repository';
import {ProponenteRepository} from './proponente.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.id,
  DepartamentoRelations
> {

  public readonly pertenece_a: BelongsToAccessor<Facultad, typeof Departamento.prototype.id>;

  public readonly tienen_muchos: HasManyThroughRepositoryFactory<Proponente, typeof Proponente.prototype.id,
          ProponenteDepartamento,
          typeof Departamento.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('FacultadRepository') protected facultadRepositoryGetter: Getter<FacultadRepository>, @repository.getter('ProponenteDepartamentoRepository') protected proponenteDepartamentoRepositoryGetter: Getter<ProponenteDepartamentoRepository>, @repository.getter('ProponenteRepository') protected proponenteRepositoryGetter: Getter<ProponenteRepository>,
  ) {
    super(Departamento, dataSource);
    this.tienen_muchos = this.createHasManyThroughRepositoryFactoryFor('tienen_muchos', proponenteRepositoryGetter, proponenteDepartamentoRepositoryGetter,);
    this.registerInclusionResolver('tienen_muchos', this.tienen_muchos.inclusionResolver);
    this.pertenece_a = this.createBelongsToAccessorFor('pertenece_a', facultadRepositoryGetter,);
    this.registerInclusionResolver('pertenece_a', this.pertenece_a.inclusionResolver);
  }
}
