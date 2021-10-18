import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Jurado} from './jurado.model';
import {Solicitud} from './solicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_solicitud_IdSolicitud: {
        name: 'fk_solicitud_IdSolicitud',
        entity: 'solicitud',
        entityKey: 'id',
        foreignKey: 'IdSolicitud',
      },
      fk_jurado_IdJurado: {
        name: 'fk_jurado_IdJurado',
        entity: 'Jurado',
        entityKey: 'id',
        foreignKey: 'IdJurado',
      }
    },
  },
},)

export class InvitacionEvaluar extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha_invitacion: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_respuesta: string;

  @property({
    type: 'number',
    required: true,
  })
  estado_invitacion: number;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;

  @belongsTo(() => Jurado, {name: 'pertenece_a'})
  id_jurado: number;

  @belongsTo(() => Solicitud, {name: 'tiene_una'})
  id_solicitud: number;

  constructor(data?: Partial<InvitacionEvaluar>) {
    super(data);
  }
}

export interface InvitacionEvaluarRelations {
  // describe navigational properties here
}

export type InvitacionEvaluarWithRelations = InvitacionEvaluar & InvitacionEvaluarRelations;
