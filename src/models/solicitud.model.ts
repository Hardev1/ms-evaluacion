import {belongsTo, Entity, model, property} from '@loopback/repository';
import {EstadoSolicitud} from './estado-solicitud.model';
import {LineaInvestigacion} from './linea-investigacion.model';
import {Modalidad} from './modalidad.model';
import {TipoSolicitud} from './tipo-solicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_lineaInvestigacion_id_linea_investigacion: {
        name: 'fk_lineaInvestigacion_IdLineaInvestigacion',
        entity: 'LineaInvestigacion',
        entityKey: 'id',
        foreignKey: 'id_linea_investigacion',
      },
      fk_tipoSolicitud_id_tipo_solicitud: {
        name: 'fk_tipoSolicitud_id_tipo_solicitud',
        entity: 'TipoSolicitud',
        entityKey: 'id',
        foreignKey: 'id_tipo_solicitud',
      },
      fk_modalidad_id_modalidad: {
        name: 'fk_modalidad_IdModalidad',
        entity: 'Modalidad',
        entityKey: 'id',
        foreignKey: 'id_modalidad',
      },
      fk_estadoSolicitud_id_estado_solicitud: {
        name: 'fk_estadoSolicitud_IdEstadoSolicitud',
        entity: 'EstadoSolicitud',
        entityKey: 'id',
        foreignKey: 'id_estado_solicitud',
      },
    },
  },
})
export class Solicitud extends Entity {
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
    type: 'string',
    required: true,
  })
  nombre_solicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  archivo: string;

  @property({
    type: 'string',
    required: false,
  })
  descripcion?: string;

  @belongsTo(() => TipoSolicitud, {name: 'tiene_un'})
  id_tipo_solicitud: number;

  @belongsTo(() => EstadoSolicitud, {name: 'posee_un'})
  id_estado_solicitud?: number;

  @belongsTo(() => Modalidad, {name: 'pertenece_a'})
  id_modalidad: number;

  @belongsTo(() => LineaInvestigacion, {name: 'tiene_una'})
  id_linea_investigacion: number;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
