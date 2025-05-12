import express, { type Express } from 'express';

/* IMPORT ROUTES */
import healthRoutes from './healthcheck';

const app: Express = express();

/* ROUTES */
app.use('/api/v1/healthcheck', healthRoutes);

export default app;
