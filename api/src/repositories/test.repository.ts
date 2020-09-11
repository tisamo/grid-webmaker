import {DefaultCrudRepository} from '@loopback/repository';
import {Test, TestRelations} from '../models';
import {ZsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TestRepository extends DefaultCrudRepository<
  Test,
  typeof Test.prototype.id,
  TestRelations
> {
  constructor(
    @inject('datasources.zs') dataSource: ZsDataSource,
  ) {
    super(Test, dataSource);
  }
}
