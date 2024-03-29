import express from 'express';
import { loginRoutes } from './domain/routes/loginRoutes';
import { userRoutes } from './domain/routes/userRoutes';
import { productsRoutes } from './domain/routes/productRoutes';
import { deliveryRoutes } from './domain/routes/deliveryRoutes';
import { paymentRoutes } from './domain/routes/paymentRoutes';
import cors from 'cors';
import cookieParser from 'cookie-parser';

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
app.use('/payments', paymentRoutes)

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${port}`);
})