import { Delivery } from "@prisma/client"

export interface DeliveryPayload {
  value: number
  status: string
}

export interface IDeliveryRepository {
  getById: (id: number) => Promise<Delivery | null>
  getUserDeliveries: (id: number) => Promise<Delivery[] | null>
  remove: (id: number) => Promise<boolean>
  update: (payload: DeliveryPayload, id: number) => Promise<Delivery | null>
  create: (payload: DeliveryPayload) => Promise<Delivery | null>
}