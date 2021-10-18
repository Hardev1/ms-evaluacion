import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_solicitud_IdSolicitud: {
        name: 'fk_solicitud_IdSolicitud',
        entity: 'solicitud',
        entityKey: 'id',
        foreignKey: 'IdSolicitud',
      },
      fk_comite_IdComite: {
        name: 'fk_comite_IdComite',
        entity: 'Comite',
        entityKey: 'id',
        foreignKey: 'IdComite',
      }
    },
  },
},)

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

export type SolicitudComiteWithRelations = SolicitudComite & SolicitudComiteRelations;
