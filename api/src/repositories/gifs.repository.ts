import {DefaultCrudRepository} from '@loopback/repository';
import {Gifs, GifsRelations} from '../models';
import {ZsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class GifsRepository extends DefaultCrudRepository<
  Gifs,
  typeof Gifs.prototype.id,
  GifsRelations
> {
  constructor(
    @inject('datasources.zs') dataSource: ZsDataSource,
  ) {
    super(Gifs, dataSource);
  }
}
