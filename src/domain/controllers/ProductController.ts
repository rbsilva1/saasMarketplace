import { Request, Response } from "express";
import { IProductController } from "../interfaces/IProductController";
import { ProductPayload } from "../../infra/protocols/IProductRepository";
import ProductRepository from "../../infra/data/ProductRepository";

export class ProductController implements IProductController {
  constructor() { }

  async getById(req: Request, res: Response) {
    try {
      const productId = Number(req.params.id)

      const product = await ProductRepository.getById(productId);

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
      const products = await ProductRepository.getAll()

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
      const { name, description, price, quantity, categoryId } = req.body;

      const productUpdated = await ProductRepository.update({ name, description, price, quantity, categoryId }, id)

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

      const product = await ProductRepository.remove(id)

      if (!product) {
        return res.status(200).json({ deleted: true })
      }

      return res.status(400).json({ deleted: false })
    } catch (e) {
      return res.status(500).json({ error: 'Internal Server Error ' })
    }
  }

  async create(req: Request, res: Response) {
    try {
      const product: ProductPayload = req.body

      const createdProduct = await ProductRepository.create(product)

      if (!createdProduct) {
        return res.status(400).json({ error: 'Error while creating product' })
      }

      return res.status(200).json(createdProduct)
    } catch (e) {
      return res.status(500).json({ error: 'Internal Server Error ' })
    }
  }
}