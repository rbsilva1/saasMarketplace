import { IProductRepository } from "../protocols/IProductRepository";
import { ProductPayload } from "../protocols/IProductRepository";
import { prisma } from "../../domain/services/prisma";

export class ProductRepository implements IProductRepository {
  async update(product: Partial<ProductPayload>, id: number) {
    const updatedProduct = await prisma.product.update({
      where: {
        id
      },
      data: {
        ...product
      }
    })

    if (!updatedProduct) return null

    return updatedProduct;
  }

  async create(product: ProductPayload) {
    const createdProduct = await prisma.product.create({
      data: product
    })

    if (!createdProduct) return null;

    return createdProduct
  }

  async remove(id: number) {
    const removedProduct = await prisma.product.delete({
      where: { id }
    })

    if (!removedProduct) return false;

    return true
  }

  async getById(id: number) {
    const product = await prisma.product.findUnique({
      where: { id }
    })

    if (!product) return null

    return product
  }

  async getAll() {
    const products = await prisma.product.findMany({})

    if (!products) return null

    return products
  }
}

export default new ProductRepository()