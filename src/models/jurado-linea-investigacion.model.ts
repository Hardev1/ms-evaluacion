import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_lineaInvestigacion_id_linea_investigacion: {
        name: 'fk_lineaInvestigacion_id_linea_investigacion',
        entity: 'LineaInvestigacion',
        entityKey: 'id',
        foreignKey: 'id_linea_investigacion',
      },
      fk_jurado_IdJurado: {
        name: 'fk_jurado_IdJurado',
        entity: 'Jurado',
        entityKey: 'id',
        foreignKey: 'id_jurado',
      },
    },
  },
})
export class JuradoLineaInvestigacion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  id_linea_investigacion?: number;

  @property({
    type: 'number',
  })
  id_jurado?: number;

  constructor(data?: Partial<JuradoLineaInvestigacion>) {
    super(data);
  }
}

export interface JuradoLineaInvestigacionRelations {
  // describe navigational properties here
}

export type JuradoLineaInvestigacionWithRelations = JuradoLineaInvestigacion &
  JuradoLineaInvestigacionRelations;
