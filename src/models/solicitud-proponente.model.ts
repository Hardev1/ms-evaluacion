import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_proponente_id_proponente: {
        name: 'fk_proponente_id_proponente',
        entity: 'Proponente',
        entityKey: 'id',
        foreignKey: 'id_proponente',
      },
      fk_solicitud_id_solicitud: {
        name: 'fk_solicitud_id_solicitud',
        entity: 'Solicitud',
        entityKey: 'id',
        foreignKey: 'id_solicitud',
      },
    },
  },
})
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

export type SolicitudProponenteWithRelations = SolicitudProponente &
  SolicitudProponenteRelations;
