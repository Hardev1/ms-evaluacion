import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_proponente_IdDepartamento: {
        name: 'fk_proponente_idDepartamento',
        entity: 'Departamento',
        entityKey: 'id',
        foreignKey: 'idDepartamento',
      },
      fk_proponente_IdProponente: {
        name: 'fk_proponente_idProponente',
        entity: 'Proponente',
        entityKey: 'id',
        foreignKey: 'idProponente',
      }
    },
  },
},
)

export class ProponenteDepartamento extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  id_departamento?: number;

  @property({
    type: 'number',
  })
  id_proponente?: number;

  constructor(data?: Partial<ProponenteDepartamento>) {
    super(data);
  }
}

export interface ProponenteDepartamentoRelations {
  // describe navigational properties here
}

export type ProponenteDepartamentoWithRelations = ProponenteDepartamento & ProponenteDepartamentoRelations;
