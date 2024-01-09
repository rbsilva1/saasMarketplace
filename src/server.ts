import express from 'express';
import { userRoutes } from './routes/userRoutes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { loginRoutes } from './routes/loginRoutes';

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
app.use(loginRoutes);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${port}`);
})