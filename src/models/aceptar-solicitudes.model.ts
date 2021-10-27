import {Model, model, property} from '@loopback/repository';

@model()
export class AceptarSolicitudes extends Model {
  @property({
    type: 'boolean',
    required: true,
  })
  respuesta: boolean;

  @property({
    type: 'number',
    required: true,
  })
  id_solicitud: number;

  @property({
    type: 'number',
    required: true,
  })
  id_jurado: number;

  @property({
    type: 'string',
    required: false,
  })
  descripcion?: string;

  constructor(data?: Partial<AceptarSolicitudes>) {
    super(data);
  }
}

export interface AceptarSolicitudesRelations {
  // describe navigational properties here
}

export type AceptarSolicitudesWithRelations = AceptarSolicitudes &
  AceptarSolicitudesRelations;
