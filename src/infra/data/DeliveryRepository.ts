import { prisma } from "../../domain/services/prisma";
import { DeliveryPayload, IDeliveryRepository } from "../protocols/IDeliveryRepository";

export class DeliveryRepository implements IDeliveryRepository {
  constructor() { }

  async getById(id: number) {
    const delivery = await prisma.delivery.findUnique({
      where: {
        id
      }
    })

    if (!delivery) return null

    return delivery
  }

  async remove(id: number) {
    const removedDelivery = await prisma.delivery.delete({
      where: {
        id
      }
    })

    if (!removedDelivery) return false

    return true
  }

  async update(payload: DeliveryPayload, id: number) {
    const updatedDelivery = await prisma.delivery.update({
      where: {
        id
      },
      data: payload
    })

    if (!updatedDelivery) return null

    return updatedDelivery
  }

  async create(payload: DeliveryPayload) {
    const createdDelivery = await prisma.delivery.create({
      data: payload
    })

    if (!createdDelivery) return null

    return createdDelivery
  };

  async getUserDeliveries(id: number) {
    const userDeliveries = await prisma.delivery.findMany({
      where: {
        userId: id
      }
    })

    if (!userDeliveries) return null

    return userDeliveries
  }
}

export default new DeliveryRepository()