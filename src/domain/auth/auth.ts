import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { passwordValidation } from "../../utils/passwordValidation";
import { prisma } from "../services/prisma";

interface User {
  email: string;
  id: number;
}

declare global {
  namespace Express {
    interface Request {
      user: User
    }
  }
}

const secret = process.env.JWT_SECRET as string;

export const authToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.auth;

    if (!token) {
      return res.status(400).json({ message: "Unauthourized user." });
    }

    const decoded = jwt.verify(token, secret);

    if (!decoded) {
      throw new Error("Invalid token.");
    }

    req.user = decoded as User;
    return next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    return res.status(400).json({ message: "User not found." });
  }

  const validatePassword = await passwordValidation(password, user.password);

  if (!validatePassword) {
    return res.status(400).json({ message: "Invalid password." });
  }

  const { id } = user;

  res.cookie("auth", jwt.sign({ email, id }, secret), {
    httpOnly: true,
    maxAge: 7 * 86400,
    path: "/",
  });

  res.status(200).send("Logged in.")
};

export const signOut = async (req: Request, res: Response) => {
  res.clearCookie("auth");

  res.status(200).send("Logged out.");
};