import {Model, model, property} from '@loopback/repository';

@model()
//Modelo para asignar las solicitudes que los jurados van a evaluar
export class InvitacionEvaluarConceptual extends Model {
  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  jurados: number[];

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  solicitudes: number[];

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
  })
  fecha_respuesta?: string;

  @property({
    type: 'number',
    required: false,
    default: 0
  })
  estado_invitacion?: number;

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

  constructor(data?: Partial<InvitacionEvaluarConceptual>) {
    super(data);
  }
}

export interface InvitacionEvaluarConceptualRelations {
  // describe navigational properties here
}

export type InvitacionEvaluarConceptualWithRelations = InvitacionEvaluarConceptual & InvitacionEvaluarConceptualRelations;
