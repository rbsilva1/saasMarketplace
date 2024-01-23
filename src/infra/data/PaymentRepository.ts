import { IPaymentRepository, PaymentPayload } from "../protocols/IPaymentRepository";
import { prisma } from "../../domain/services/prisma"

export class PaymentRepository implements IPaymentRepository {
  constructor() { }

  async update(paymentId: string, status: string) {
    const payment = await prisma.payment.update({
      where: {
        paymentId
      },
      data: {
        status
      }
    })

    if (!payment) return null

    return payment
  }

  async getByPaymentId(paymentId: string) {
    const payment = await prisma.payment.findUnique({
      where: {
        paymentId
      }
    })

    if (!payment) return null

    return payment
  }

  async add(payload: PaymentPayload) {
    const payment = await prisma.payment.create({
      data: payload
    })

    if (!payment) return null

    return payment
  }
}

export default new PaymentRepository()