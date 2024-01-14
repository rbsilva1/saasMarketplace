import { Router } from 'express';
import userController from '../controllers/UserController';
import { authToken } from '../auth/auth';

const userRoutes = Router();

userRoutes.get('/', authToken, userController.index);
userRoutes.post('/', authToken, userController.create);
userRoutes.put('/edit/:id', authToken, userController.update)

export { userRoutes };