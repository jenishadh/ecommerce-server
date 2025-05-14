import express, { type Express } from 'express';

import { errorMiddleware } from './middlewares/error.middleware';
/* IMPORT ROUTES */
import healthRoutes from './features/healthcheck';
import authRoutes from './features/auth';

const app: Express = express();

/* CONFIGURATIONS */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ROUTES */
app.use('/api/v1/healthcheck', healthRoutes);
app.use('/api/v1/auth', authRoutes);

// Error middleware - Catch custom api errors
app.use(errorMiddleware);

export default app;
