import {Entity, model, property, hasMany} from '@loopback/repository';
import {Jurado} from './jurado.model';
import {JuradoLineaInvestigacion} from './jurado-linea-investigacion.model';

@model()
export class LineaInvestigacion extends Entity {
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

  @hasMany(() => Jurado, {through: {model: () => JuradoLineaInvestigacion, keyFrom: 'id_linea_investigacion', keyTo: 'id_jurado'}})
  tiene_un: Jurado[];

  constructor(data?: Partial<LineaInvestigacion>) {
    super(data);
  }
}

export interface LineaInvestigacionRelations {
  // describe navigational properties here
}

export type LineaInvestigacionWithRelations = LineaInvestigacion & LineaInvestigacionRelations;
