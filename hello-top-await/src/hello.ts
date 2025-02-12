import { MikroORM } from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { User } from './user.entity.js';


const orm = await MikroORM.init({
  dbName: "testdb",
  driver: PostgreSqlDriver,
  user: "postgres",
  password: "coolman",
  host: "localhost",
  port: 5432,
  entities: [User],
  allowGlobalContext: true,
});

const user = await orm.em.findOne(User, 1);
console.log(`Hello, ${user!.fullName}!`);
