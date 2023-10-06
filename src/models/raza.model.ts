import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {TipoMascota} from './tipo-mascota.model';
import {Mascota} from './mascota.model';

@model({
  settings: {
    foreignKeys: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      fk_tipo_mascota_id: {
      name: 'fk_tipo_mascota_id',
      entity: 'TipoMascota',
        entityKey: 'id',
        foreignKey: 'tipoMascotaID',
      },
    },
  },
})
export class Raza extends Entity {
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

  @belongsTo(() => TipoMascota)
  tipoMascotaId: number;

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  constructor(data?: Partial<Raza>) {
    super(data);
  }
}

export interface RazaRelations {
  // describe navigational properties here
}

export type RazaWithRelations = Raza & RazaRelations;
