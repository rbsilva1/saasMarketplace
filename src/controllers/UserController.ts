import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { IUserController } from "../interfaces/IUserController";

const prisma = new PrismaClient();

interface UserPayload {
  name: string;
  email?: string;
}

export class UserController implements IUserController {
  async index(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true
        }
      });

      if (!users) {
        return res.status(400).json({ message: "Users not found." });
      }

      return res.status(200).json(users);
    } catch (e) {
      return res.status(500).json({ message: "Internal server error." });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const passwordHash = await hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: passwordHash
        }
      });

      if (!user) {
        return res.status(400).json({ message: "User not created." });
      }

      return res.status(200).json(user);
    } catch (e) {
      return res.status(400).json({ error: "Internal Server Error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const { name, email }: UserPayload = req.body

      const userUpdated = await prisma.user.update({
        where: {
          id
        },
        data: {
          name,
          email
        },
        select: {
          name: true,
          email: true
        }
      })

      if (!userUpdated) {
        return res.status(400).json({ error: "Error while trying to update user" })
      }
      return res.status(200).json(userUpdated)
    } catch (e) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default new UserController();