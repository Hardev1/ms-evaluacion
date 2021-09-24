import {Entity, model, property, belongsTo} from '@loopback/repository';
import {InvitacionEvaluar} from './invitacion-evaluar.model';

@model()
export class Recordatorio extends Entity {
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
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  hora: number;

  @property({
    type: 'number',
    required: true,
  })
  tipo_recordatorio: number;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @belongsTo(() => InvitacionEvaluar, {name: 'tiene_una'})
  id_invitacion_evaluar: number;

  constructor(data?: Partial<Recordatorio>) {
    super(data);
  }
}

export interface RecordatorioRelations {
  // describe navigational properties here
}

export type RecordatorioWithRelations = Recordatorio & RecordatorioRelations;
