import {DefaultCrudRepository} from '@loopback/repository';
import {Design, DesignRelations} from '../models';
import {ZsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DesignRepository extends DefaultCrudRepository<
  Design,
  typeof Design.prototype.id,
  DesignRelations
> {
  constructor(
    @inject('datasources.zs') dataSource: ZsDataSource,
  ) {
    super(Design, dataSource);
  }
}
