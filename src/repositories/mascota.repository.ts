import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Mascota, MascotaRelations, Raza, HistoriaMedica, Ciudad} from '../models';
import {RazaRepository} from './raza.repository';
import {HistoriaMedicaRepository} from './historia-medica.repository';
import {CiudadRepository} from './ciudad.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly raza: BelongsToAccessor<Raza, typeof Mascota.prototype.id>;

  public readonly historiaMedicas: HasManyRepositoryFactory<HistoriaMedica, typeof Mascota.prototype.id>;

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Mascota.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('RazaRepository') protected razaRepositoryGetter: Getter<RazaRepository>, @repository.getter('HistoriaMedicaRepository') protected historiaMedicaRepositoryGetter: Getter<HistoriaMedicaRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>,
  ) {
    super(Mascota, dataSource);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
    this.historiaMedicas = this.createHasManyRepositoryFactoryFor('historiaMedicas', historiaMedicaRepositoryGetter,);
    this.registerInclusionResolver('historiaMedicas', this.historiaMedicas.inclusionResolver);
    this.raza = this.createBelongsToAccessorFor('raza', razaRepositoryGetter,);
    this.registerInclusionResolver('raza', this.raza.inclusionResolver);
  }
}
