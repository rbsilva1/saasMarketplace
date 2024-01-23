import { Router } from 'express'
import { authToken } from '../auth/auth'
import { ProductController } from '../controllers/ProductController'

const productsRoutes = Router()
const productController = new ProductController()

productsRoutes.get('/:id', authToken, productController.getById)
productsRoutes.get('/', productController.getAll)
productsRoutes.put('/:id', authToken, productController.update)
productsRoutes.delete('/:id', authToken, productController.remove)
productsRoutes.post('/', authToken, productController.create)

export { productsRoutes }