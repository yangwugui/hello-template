import { MikroORM } from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { User } from './user.entity';

async function init(){
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
  return orm;
}

init().then(orm => {
  orm.em.findOne(User, 1).then(user => {
    console.log(`Hello, ${user!.fullName}!`);
  })
});

function hello() {
}

hello()
