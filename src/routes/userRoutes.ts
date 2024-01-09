import { Router } from 'express';	
import userController from '../controllers/userController';
import { authToken } from '../auth/auth';

const userRoutes = Router();

userRoutes.get('/', authToken, userController.index);
userRoutes.post('/', authToken, userController.create);

export { userRoutes };