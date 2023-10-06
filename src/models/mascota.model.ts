import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Raza} from './raza.model';
import {HistoriaMedica} from './historia-medica.model';
import {Ciudad} from './ciudad.model';

@model({
  settings: {
    foreignKeys: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      fk_raza_id_mascota: {
      name: 'fk_raza_id_mascota',
      entity: 'Raza',
        entityKey: 'id',
        foreignKey: 'razaId',
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      fk_ciudad_id_mascota: {
        name: 'fk_ciudad_id_mascota',
        entity: 'Ciudad',
          entityKey: 'id',
          foreignKey: 'ciudadId',
        },
    },
  },
})
export class Mascota extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  identificador: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'date',
  })
  fechaNacimiento?: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @belongsTo(() => Raza)
  razaId: number;

  @hasMany(() => HistoriaMedica)
  historiaMedicas: HistoriaMedica[];

  @belongsTo(() => Ciudad)
  ciudadId: number;

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
