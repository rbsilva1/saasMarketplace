import express from 'express';
import { loginRoutes } from './routes/loginRoutes';
import { userRoutes } from './routes/userRoutes';
import { productsRoutes } from './routes/productRoutes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { deliveryRoutes } from './routes/deliveryRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(cors({
  credentials: true,
  allowedHeaders: ['Content-Type'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/products', productsRoutes);
app.use('/deliveries', deliveryRoutes);
app.use(loginRoutes);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${port}`);
})