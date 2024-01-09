import { Router } from 'express';
import { signIn, signOut } from '../auth/auth';

const loginRoutes = Router();

loginRoutes.post('/signin', signIn);
loginRoutes.get('/signout', signOut);

export { loginRoutes };