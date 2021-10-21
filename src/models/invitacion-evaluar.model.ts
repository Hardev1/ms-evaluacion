import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Jurado} from './jurado.model';
import {Solicitud} from './solicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_solicitud_id_solicitud: {
        name: 'fk_solicitud_id_solicitud',
        entity: 'solicitud',
        entityKey: 'id',
        foreignKey: 'id_solicitud',
      },
      fk_jurado_IdJurado: {
        name: 'fk_jurado_IdJurado',
        entity: 'jurado',
        entityKey: 'id',
        foreignKey: 'id_jurado',
      },
    },
  },
})
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

export type InvitacionEvaluarWithRelations = InvitacionEvaluar &
  InvitacionEvaluarRelations;
