import { Options, PostgreSqlDriver } from "@mikro-orm/postgresql"

const config: Options = {
  dbName: "nest_sample",
  driver: PostgreSqlDriver,
  user: "postgres",
  password: "coolman",
  host: "localhost",
  port: 5432,
  entities: ["dist/**/*.entity.js"],
  entitiesTs: ["src/**/*.entity.ts"],
  forceUndefined: false,
  debug: true,
}

export default config
