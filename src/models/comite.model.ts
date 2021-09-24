import {Entity, model, property, hasMany} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {SolicitudComite} from './solicitud-comite.model';

@model()
export class Comite extends Entity {
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

  @hasMany(() => Solicitud, {through: {model: () => SolicitudComite, keyFrom: 'id_comite', keyTo: 'id_solicitud'}})
  posee_muchos: Solicitud[];

  constructor(data?: Partial<Comite>) {
    super(data);
  }
}

export interface ComiteRelations {
  // describe navigational properties here
}

export type ComiteWithRelations = Comite & ComiteRelations;
