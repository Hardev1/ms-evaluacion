import {Model, model, property} from '@loopback/repository';

@model()
export class NotificacionCorreo extends Model {
  @property({
    type: 'string',
    required: true,
  })
  destinatario: string;

  @property({
    type: 'string',
    required: true,
  })
  asunto: string;

  @property({
    type: 'string',
    required: true,
  })
  mensaje: string;


  constructor(data?: Partial<NotificacionCorreo>) {
    super(data);
  }
}

export interface NotificacionRelations {
  // describe navigational properties here
}

export type NotificacionWithRelations = NotificacionCorreo & NotificacionRelations;
