import { Request, Response } from "express";
import { hash } from "bcryptjs";
import { IUserController } from "../interfaces/IUserController";
import { UserPayload } from "../../infra/protocols/IUserRepository";
import UserRepository from "../../infra/data/UserRepository";

class UserController implements IUserController {
  constructor() { }

  async remove(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const deletedUser = await UserRepository.remove(id)

      if (!deletedUser) {
        return res.status(400).json({ error: 'Error while trying to remove the user.' })
      }

      return res.status(200).json({ deleted: deletedUser })
    } catch (e) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const users = await UserRepository.getAll()

      if (!users) {
        return res.status(400).json({ message: "Users not found." });
      }

      return res.status(200).json(users);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Internal server error." });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const passwordHash = await hash(password, 10);

      const user = await UserRepository.create({ name, email, password: passwordHash })

      if (!user) {
        return res.status(400).json({ message: "User not created." });
      }

      return res.status(200).json(user);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const { name, email }: UserPayload = req.body

      const userUpdated = await UserRepository.update({ name, email }, id)

      if (!userUpdated) {
        return res.status(400).json({ error: "Error while trying to update user" })
      }
      return res.status(200).json(userUpdated)
    } catch (e) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default UserController;