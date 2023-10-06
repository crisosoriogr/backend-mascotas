import {Entity, belongsTo, model, property, hasMany} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {Mascota} from './mascota.model';

@model({
  settings: {
    foreignKeys: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      fk_depto_ciudad_id: {
      name: 'fk_depto_id',
      entity: 'Departamento',
        entityKey: 'id',
        foreignKey: 'departamentoId',
      },
    },
  },
})
export class Ciudad extends Entity {
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

  @belongsTo(() => Departamento)
  departamentoId: number;

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {

}

export type CiudadWithRelations = Ciudad & CiudadRelations;
