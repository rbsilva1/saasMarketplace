import { PrismaClient } from "@prisma/client";
import { DeliveryPayload, IDeliveryRepository } from "../interfaces/IDeliveryRepository";

export class DeliveryRepository implements IDeliveryRepository {
  private prisma: PrismaClient
  constructor() {
    this.prisma = new PrismaClient()
  }

  async getById(id: number) {
    const delivery = await this.prisma.delivery.findUnique({
      where: {
        id
      }
    })

    if (!delivery) return null

    return delivery
  }

  async remove(id: number) {
    const removedDelivery = await this.prisma.delivery.delete({
      where: {
        id
      }
    })

    if (!removedDelivery) return false

    return true
  }

  async update(payload: DeliveryPayload, id: number) {
    const updatedDelivery = await this.prisma.delivery.update({
      where: {
        id
      },
      data: payload
    })

    if (!updatedDelivery) return null

    return updatedDelivery
  }

  async create(payload: DeliveryPayload) {
    const createdDelivery = await this.prisma.delivery.create({
      data: payload
    })

    if (!createdDelivery) return null

    return createdDelivery
  };

  async getUserDeliveries(id: number) {
    const userDeliveries = await this.prisma.delivery.findMany({
      where: {
        userId: id
      }
    })

    if (!userDeliveries) return null

    return userDeliveries
  }
} 