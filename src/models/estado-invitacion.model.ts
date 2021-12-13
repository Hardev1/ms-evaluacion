import {Entity, model, property} from '@loopback/repository';

@model()
export class EstadoInvitacion extends Entity {
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
  nombre: string;


  constructor(data?: Partial<EstadoInvitacion>) {
    super(data);
  }
}

export interface EstadoInvitacionRelations {
  // describe navigational properties here
}

export type EstadoInvitacionWithRelations = EstadoInvitacion & EstadoInvitacionRelations;
