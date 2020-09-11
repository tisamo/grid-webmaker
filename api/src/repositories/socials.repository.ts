import {DefaultCrudRepository} from '@loopback/repository';
import {Socials, SocialsRelations} from '../models';
import {ZsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SocialsRepository extends DefaultCrudRepository<
  Socials,
  typeof Socials.prototype.id,
  SocialsRelations
> {
  constructor(
    @inject('datasources.zs') dataSource: ZsDataSource,
  ) {
    super(Socials, dataSource);
  }
}
