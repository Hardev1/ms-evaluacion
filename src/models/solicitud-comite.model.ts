import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_comite_id_comite_intermedia: {
        name: 'fk_comite_id_comite_intermedia',
        entity: 'Comite',
        entityKey: 'id',
        foreignKey: 'id_comite',
      },
      fk_solicitud_id_solicitud_intermedia: {
        name: 'fk_solicitud_id_solicitud_intermedia',
        entity: 'Solicitud',
        entityKey: 'id',
        foreignKey: 'id_solicitud',
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
