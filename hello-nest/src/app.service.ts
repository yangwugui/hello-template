import { Injectable } from "@nestjs/common"
import { EntityManager } from "@mikro-orm/postgresql"
//import { MikroORM } from "@mikro-orm/postgresql"
import { User } from "./user.entity"

@Injectable()
export class AppService {
  constructor(private readonly em: EntityManager) {}

  async getHello() {
    const user = await this.em.findOne(User, 1)
    return user?.fullName || "Hello World!"
  }
}
