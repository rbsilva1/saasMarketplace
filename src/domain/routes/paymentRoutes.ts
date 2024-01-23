import { Router } from 'express'
import { PaymentController } from '../controllers/PaymentController'
import { authToken } from '../auth/auth'

const paymentRoutes = Router()
const paymentController = new PaymentController()

paymentRoutes.post('/pay', authToken, paymentController.pay)

export { paymentRoutes }