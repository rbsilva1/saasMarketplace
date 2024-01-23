import { Payment } from "@prisma/client"

export interface PaymentPayload {
  value: number
  status: string
  userId: number
  paymentId: string
}

export interface IPaymentRepository {
  update: (paymentId: string, status: string) => Promise<Payment | null>
  getByPaymentId: (paymentId: string) => Promise<Payment | null>
  add: (payload: PaymentPayload) => Promise<Payment | null>
}