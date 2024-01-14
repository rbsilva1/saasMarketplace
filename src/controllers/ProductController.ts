import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express";
import { IProductController } from "../interfaces/IProductController";

const prisma = new PrismaClient();

export class ProductController implements IProductController {
  async getById(req: Request, res: Response) {
    try {
      const productId = Number(req.params.id)
      const product = await prisma.product.findUnique({
        where: {
          id: productId
        }
      })

      if (!product) {
        return res.status(400).json({ error: 'Error while getting product' })
      }

      return res.status(200).json(product)
    } catch (e) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const products = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          description: true
        }
      })

      if (!products) {
        return res.json(400).json({ error: "Error while trying to get products" })
      }

      return res.status(200).json(products);
    } catch (e) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { name, description } = req.body;
      const productUpdated = await prisma.product.update({
        where: {
          id
        },
        data: {
          name,
          description
        }
      })

      if (!productUpdated) {
        return res.json(400).json({ error: "Error while trying to update product" })
      }

      return res.status(200).json(productUpdated)
    } catch (e) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const product = await prisma.product.delete({
        where: { id }
      })

      if (!product) {
        return res.status(200).json({ deleted: true })
      }

      return res.status(400).json({ deleted: false })
    } catch (e) {
      return res.status(500).json({ error: 'Internal Server Error ' })
    }
  }
}

export default new ProductController();