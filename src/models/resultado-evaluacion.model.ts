import {belongsTo, Entity, model, property} from '@loopback/repository';
import {InvitacionEvaluar} from './invitacion-evaluar.model';

@model( {
  settings: {
    foreignKeys: {
      fk_invitacionEvaluar_id_invitacion_evaluar: {
        name: 'fk_invitacionEvaluar_id_invitacion_evaluar',
        entity: 'InvitacionEvaluar',
        entityKey: 'id',
        foreignKey: 'id_invitacion_evaluar',
      },
    },
  },
} )
export class ResultadoEvaluacion extends Entity {
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
  descripcion: string;

  @property({
    type: 'date',
    required: false,
  })
  fecha?: string;

  @property({
    type: 'string',
    required: true,
  })
  formato_diligenciado: string;

  @belongsTo(() => InvitacionEvaluar, {name: 'tiene_una'})
  id_invitacion_evaluar: number;

  constructor(data?: Partial<ResultadoEvaluacion>) {
    super(data);
  }
}

export interface ResultadoEvaluacionRelations {
  // describe navigational properties here
}

export type ResultadoEvaluacionWithRelations = ResultadoEvaluacion &
  ResultadoEvaluacionRelations;
