import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

export class UserController {
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
  
      res.status(200).json(users);  
    } catch(e) {
      res.status(500).json({ message: "Internal server error." });
    }
  } 

  async create(req: Request, res: Response) {
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

    res.status(200).json(user);
  }
}

export default new UserController();