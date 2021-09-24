import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {SolicitudProponente} from './solicitud-proponente.model';
import {TipoVinculacion} from './tipo-vinculacion.model';

@model()
export class Proponente extends Entity {
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
  primer_nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  otros_nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  primer_apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  segundo_apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_nacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  fotografia: string[];

  @hasMany(() => Solicitud, {through: {model: () => SolicitudProponente, keyFrom: 'id_proponente', keyTo: 'id_solicitud'}})
  tiene_muchas: Solicitud[];

  @belongsTo(() => TipoVinculacion, {name: 'tiene_un'})
  id_tipo_vinculacion: number;

  constructor(data?: Partial<Proponente>) {
    super(data);
  }
}

export interface ProponenteRelations {
  // describe navigational properties here
}

export type ProponenteWithRelations = Proponente & ProponenteRelations;
