import { Router } from 'express'
import productController from '../controllers/ProductController'
import { authToken } from '../auth/auth'

const productsRoutes = Router()

productsRoutes.get('/:id', authToken, productController.getById)
productsRoutes.get('/', productController.getAll)
productsRoutes.put('/:id', authToken, productController.update)

export { productsRoutes }