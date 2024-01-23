import { IPaymentController } from '../interfaces/IPaymentController'
import { Request, Response } from 'express'
import { paymentApi } from '../services/axios'
import { AxiosResponse } from 'axios';
import PaymentRepository from '../../infra/data/PaymentRepository';

interface Session {
  id: string;
  url: string;
}

export class PaymentController implements IPaymentController {
  constructor() { }

  async pay(req: Request, res: Response) {
    try {
      const { id } = req.user
      const { name, value } = req.body

      if (!name || !value) {
        return res.status(400).json({ error: 'Missing parameters' })
      }

      const data = {
        name,
        billingType: 'UNDEFINED',
        value,
        chargeType: 'INSTALLMENT',
        notificationEnabled: true,
        dueDateLimitDays: 3,
        maxInstallmentCount: 10,
        callback: { autoRedirect: true, successUrl: 'https://seguranca-frontend.netlify.app/' },
      }

      const response = await paymentApi.post('paymentLinks', data)
        .then((response: AxiosResponse<Session>) => response.data)

      const payload = {
        value,
        status: "Waiting",
        userId: id,
        paymentId: response.id
      }

      await PaymentRepository.add(payload)
      return res.status(200).json(response)
    } catch (e) {
      // @ts-ignore
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async webhook(req: Request, res: Response) {
    try {
      const payload = req.body;

      if (!payload.payment) {
        return res.status(400).json({ error: 'Missing parameters' })
      }

      const getPayment = await PaymentRepository.getByPaymentId(payload.payment.id)

      if (!getPayment) {
        return res.status(400).json({ error: 'Payment not found' })
      }

      switch (payload.event) {
        case 'PAYMENT_CONFIRMED':
          await PaymentRepository.update(payload.payment.id, 'Confirmed')
          break;
        case 'PAYMENT_REFUNDED':
          await PaymentRepository.update(payload.payment.id, 'Refunded')
          break;
        case 'PAYMENT_CREDIT_CARD_CAPTURE_REFUSED':
          await PaymentRepository.update(payload.payment.id, 'Refused')
          break;
      }

      return res.json({ received: true })
    } catch (e) {
      // @ts-ignore
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}