import {Model, model, property} from '@loopback/repository';

@model()
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


  constructor(data?: Partial<InvitacionEvaluarConceptual>) {
    super(data);
  }
}

export interface InvitacionEvaluarConceptualRelations {
  // describe navigational properties here
}

export type InvitacionEvaluarConceptualWithRelations = InvitacionEvaluarConceptual & InvitacionEvaluarConceptualRelations;
