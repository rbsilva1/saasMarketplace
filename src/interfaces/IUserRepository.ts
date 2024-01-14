import { User } from "@prisma/client";
import { UserPayload } from "../controllers/UserController";

export interface IUserRepository {
  create: (payload: UserPayload) => Promise<User | null>
  update: (payload: Partial<UserPayload>, id: number) => Promise<User | null>
  remove: (id: number) => Promise<boolean>
  getAll: () => Promise<User[]>
}