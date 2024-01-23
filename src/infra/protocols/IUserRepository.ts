import { User } from "@prisma/client";

export interface UserPayload {
  name: string;
  email: string;
  password: string;
}

export interface IUserRepository {
  create: (payload: UserPayload) => Promise<User | null>
  update: (payload: Partial<UserPayload>, id: number) => Promise<User | null>
  remove: (id: number) => Promise<boolean>
  getAll: () => Promise<User[] | undefined>
}