import { PrismaClient } from "@prisma/client";
import { IProductRepository } from "../interfaces/IProductRepository";
import { ProductPayload } from "../interfaces/IProductRepository";

export class ProductRepository implements IProductRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }
  async update(product: ProductPayload, id: number) {
    const updatedProduct = await this.prisma.product.update({
      where: {
        id
      },
      data: product
    })

    if (!updatedProduct) return null

    return updatedProduct;
  }

  async create(product: ProductPayload) {
    const createdProduct = await this.prisma.product.create({
      data: product
    })

    if (!createdProduct) return null;

    return createdProduct
  }

  async remove(id: number) {
    const removedProduct = await this.prisma.product.delete({
      where: { id }
    })

    if (!removedProduct) return false;

    return true
  }

  async getById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id }
    })

    if (!product) return null

    return product
  }

  async getAll() {
    const products = await this.prisma.product.findMany({})

    if (!products) return null

    return products
  }
}