import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { MikroOrmModule } from "@mikro-orm/nestjs"
import { User } from "./user.entity"
import { PostgreSqlDriver } from "@mikro-orm/postgresql"

@Module({
  imports: [
    MikroOrmModule.forRoot({
      dbName: "testdb",
      driver: PostgreSqlDriver,
      user: "postgres",
      password: "coolman",
      host: "localhost",
      port: 5432,
      entities: [User],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
