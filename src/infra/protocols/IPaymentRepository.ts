import { Payment } from "@prisma/client"

export interface PaymentPayload {
  value: number
  status: string
  userId: number
}

export interface IPaymentRepository {
  add: (payload: PaymentPayload) => Promise<Payment | null>
}