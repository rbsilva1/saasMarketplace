import { Router } from 'express'
import { DeliveryController } from '../controllers/DeliveryController'
import { authToken } from '../auth/auth'

const deliveryRoutes = Router()
const deliveryController = new DeliveryController()

deliveryRoutes.get('/:id', authToken, deliveryController.getById)
deliveryRoutes.get('/user/:id', authToken, deliveryController.getUserDeliveries)
deliveryRoutes.put('/:id', authToken, deliveryController.update)
deliveryRoutes.delete('/:id', authToken, deliveryController.remove)
deliveryRoutes.post('/', authToken, deliveryController.create)

export { deliveryRoutes }