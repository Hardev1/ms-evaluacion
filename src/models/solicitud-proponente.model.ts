import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_proponente_IdProponente: {
        name: 'fk_proponente_IdProponente',
        entity: 'Proponente',
        entityKey: 'id',
        foreignKey: 'IdProponente',
      },
      fk_solicitud_IdSolicitud: {
        name: 'fk_solicitud_IdSolicitud',
        entity: 'solicitud',
        entityKey: 'id',
        foreignKey: 'IdSolicitud',
      }
    },
  },
},)

export class SolicitudProponente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  id_proponente?: number;

  @property({
    type: 'number',
  })
  id_solicitud?: number;

  constructor(data?: Partial<SolicitudProponente>) {
    super(data);
  }
}

export interface SolicitudProponenteRelations {
  // describe navigational properties here
}

export type SolicitudProponenteWithRelations = SolicitudProponente & SolicitudProponenteRelations;
