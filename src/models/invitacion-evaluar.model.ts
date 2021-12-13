import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Jurado} from './jurado.model';
import {Solicitud} from './solicitud.model';
import {EstadoInvitacion} from './estado-invitacion.model';

@model({
  settings: {
    foreignKeys: {
      fk_jurado_id_jurado_invitacion: {
        name: 'fk_jurado_id_jurado_invitacion',
        entity: 'Jurado',
        entityKey: 'id',
        foreignKey: 'id_jurado',
      },
      fk_solicitud_id_solicitud_invitacion: {
        name: 'fk_solicitud_id_solicitud_invitacion',
        entity: 'Solicitud',
        entityKey: 'id',
        foreignKey: 'id_solicitud',
      },
      fk_estado_invitacion_id_estado_invitacion: {
        name: 'fk_estado_invitacion_id_estado_invitacion',
        entity: 'EstadoInvitacion',
        entityKey: 'id',
        foreignKey: 'id_estado_invitacion',
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
    required: false,
    default: null
  })//Opcional, pues puede que no se responda la invitación
  fecha_respuesta?: string;

  @property({
    type: 'string',
    required: false,
    default: ""
  })
  observaciones?: string;

  @property({
    type: 'string',
    required: false,
  })
  hash?: string;

  @belongsTo(() => Jurado, {name: 'pertenece_a'})
  id_jurado: number;

  @belongsTo(() => Solicitud, {name: 'tiene_una'})
  id_solicitud: number;

  @belongsTo(() => EstadoInvitacion, {name: 'estado_invitacion'})
  id_estado_invitacion: number;

  constructor(data?: Partial<InvitacionEvaluar>) {
    super(data);
  }
}

export interface InvitacionEvaluarRelations {
  // describe navigational properties here
}

export type InvitacionEvaluarWithRelations = InvitacionEvaluar &
  InvitacionEvaluarRelations;
