import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Facultad} from './facultad.model';
import {Proponente} from './proponente.model';
import {ProponenteDepartamento} from './proponente-departamento.model';

@model({
  settings: {
    foreignKeys: {
      fk_facultad_IdFacultad: {
        name: 'fk_facultad_idFacultad',
        entity: 'Facultad',
        entityKey: 'id',
        foreignKey: 'idFacultad',
      }
    },
  },
},
)

export class Departamento extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @belongsTo(() => Facultad, {name: 'pertenece_a'})
  id_facultad: number;

  @hasMany(() => Proponente, {through: {model: () => ProponenteDepartamento, keyFrom: 'id_departamento', keyTo: 'id_proponente'}})
  tienen_muchos: Proponente[];

  constructor(data?: Partial<Departamento>) {
    super(data);
  }
}

export interface DepartamentoRelations {
  // describe navigational properties here
}

export type DepartamentoWithRelations = Departamento & DepartamentoRelations;
