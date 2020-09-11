import {DefaultCrudRepository} from '@loopback/repository';
import {Email, EmailRelations} from '../models';
import {ZsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EmailRepository extends DefaultCrudRepository<
  Email,
  typeof Email.prototype.id,
  EmailRelations
> {
  constructor(
    @inject('datasources.zs') dataSource: ZsDataSource,
  ) {
    super(Email, dataSource);
  }
}
