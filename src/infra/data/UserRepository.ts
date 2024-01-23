import { PrismaClient, User } from "@prisma/client"
import { UserPayload } from "../../domain/controllers/UserController"
import { IUserRepository } from "../protocols/IUserRepository"

export class UserRepository implements IUserRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async create(payload: UserPayload) {
    const { email, name, password } = payload

    const user = await this.prisma.user.create({
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

    const updatedUser = await this.prisma.user.update({
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
    const removedUser = await this.prisma.user.delete({
      where: {
        id
      }
    })

    if (!removedUser) return false

    return true
  }

  async getAll() {
    const users = await this.prisma.user.findMany({})

    return users;
  }
}