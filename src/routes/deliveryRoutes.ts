import { Router } from 'express'
import deliveryController from '../controllers/DeliveryController'

const deliveryRoutes = Router()

deliveryRoutes.get('/:id', deliveryController.getById)
deliveryRoutes.get('/user/:id', deliveryController.getUserDeliveries)
deliveryRoutes.put('/:id', deliveryController.update)
deliveryRoutes.delete('/:id', deliveryController.remove)
deliveryRoutes.post('/', deliveryController.create)

export { deliveryRoutes }