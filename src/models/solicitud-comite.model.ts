import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_solicitud_id_solicitud: {
        name: 'fk_solicitud_id_solicitud',
        entity: 'solicitud',
        entityKey: 'id',
        foreignKey: 'id_solicitud',
      },
      fk_comite_id_comite: {
        name: 'fk_comite_id_comite',
        entity: 'Comite',
        entityKey: 'id',
        foreignKey: 'id_comite',
      },
    },
  },
})
export class SolicitudComite extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  id_comite?: number;

  @property({
    type: 'number',
  })
  id_solicitud?: number;

  constructor(data?: Partial<SolicitudComite>) {
    super(data);
  }
}

export interface SolicitudComiteRelations {
  // describe navigational properties here
}

export type SolicitudComiteWithRelations = SolicitudComite &
  SolicitudComiteRelations;
