import { IUserRepository, UserPayload } from "../protocols/IUserRepository";
import { prisma } from "../../domain/services/prisma";

class UserRepository implements IUserRepository {
  constructor() { }

  async create(payload: UserPayload) {
    const { email, name, password } = payload

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    })

    if (!user) return null;

    return user;
  }

  async update(payload: Partial<UserPayload>, id: number) {
    const { email, name, password } = payload

    const updatedUser = await prisma.user.update({
      where: {
        id
      },
      data: {
        email,
        name,
        password
      }
    })

    if (!updatedUser) return null

    return updatedUser
  }

  async remove(id: number) {
    const removedUser = await prisma.user.delete({
      where: {
        id
      }
    })

    if (!removedUser) return false

    return true
  }

  async getAll() {
    const users = await prisma.user.findMany({})

    return users;
  }
}

export default new UserRepository()