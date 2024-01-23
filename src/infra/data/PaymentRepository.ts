import { IPaymentRepository, PaymentPayload } from "../protocols/IPaymentRepository";
import { prisma } from "../../domain/services/prisma"

export class PaymentRepository implements IPaymentRepository {
  constructor() { }

  async add(payload: PaymentPayload) {
    const payment = await prisma.payment.create({
      data: payload
    })

    if (!payment) return null

    return payment
  }
}

export default new PaymentRepository()