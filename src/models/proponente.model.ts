import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {SolicitudProponente} from './solicitud-proponente.model';
import {Solicitud} from './solicitud.model';
import {TipoVinculacion} from './tipo-vinculacion.model';

@model({
  settings: {
    foreignKeys: {
      fk_tipoVinculacion_id_tipo_vinculacion: {
        name: 'fk_tipoVinculacion_id_tipo_vinculacion',
        entity: 'TipoVinculacion',
        entityKey: 'id',
        foreignKey: 'id_tipo_vinculacion',
      },
    },
  },
})
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
    required: false,
  })
  otros_nombres?: string;

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

  @hasMany(() => Solicitud, {
    through: {
      model: () => SolicitudProponente,
      keyFrom: 'id_proponente',
      keyTo: 'id_solicitud',
    },
  })
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
