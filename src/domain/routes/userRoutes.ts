import { Router } from 'express';
import UserController from '../controllers/UserController';
import { authToken } from '../auth/auth';

const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/', userController.getAll);
userRoutes.post('/', userController.create);
userRoutes.put('/edit/:id', authToken, userController.update)
userRoutes.delete('/:id', authToken, userController.remove)

export { userRoutes };