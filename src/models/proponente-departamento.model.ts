import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_departamento_id_departamento_intermedia: {
        name: 'fk_departamento_id_departamento_intermedia',
        entity: 'Departamento',
        entityKey: 'id',
        foreignKey: 'id_departamento',
      },
      fk_proponente_id_proponente_intermedia: {
        name: 'fk_proponente_id_proponente_intermedia',
        entity: 'Proponente',
        entityKey: 'id',
        foreignKey: 'id_proponente',
      },
    },
  },
})
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

export type ProponenteDepartamentoWithRelations = ProponenteDepartamento &
  ProponenteDepartamentoRelations;
