import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import usersRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);

export default app;