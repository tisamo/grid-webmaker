import {DefaultCrudRepository} from '@loopback/repository';
import {Layout, LayoutRelations} from '../models';
import {ZsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class LayoutRepository extends DefaultCrudRepository<
  Layout,
  typeof Layout.prototype.id,
  LayoutRelations
> {
  constructor(
    @inject('datasources.zs') dataSource: ZsDataSource,
  ) {
    super(Layout, dataSource);
  }
}
