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
      const { id } = req.cookies.auth
      const { name, value } = req.body
      console.log(id);

      const data = {
        name,
        billingType: 'UNDEFINED',
        value,
        chargeType: 'PAYMENT',
        notificationEnabled: true,
        maxInstallmentCount: 10,
        callback: { autoRedirect: true, successUrl: 'https://seguranca-frontend.netlify.app/' },
      }

      const response = await paymentApi.post('paymentLinks', data)
        .then((response: AxiosResponse<Session>) => response.data)

      const payload = {
        value,
        status: "Waiting",
        userId: id
      }

      await PaymentRepository.add(payload)

      return res.status(200).json(response)
    } catch (e) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}