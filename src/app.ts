import express, { type Express } from 'express';
import cookieParser from 'cookie-parser';

import { errorMiddleware } from './middlewares/error.middleware';
/* IMPORT ROUTES */
import healthRoutes from './features/healthcheck';
import authRoutes from './features/auth';
import storeRoutes from './features/store';
import { billboardRoutes, billboardsRoutes } from './features/billboard';
import { categoryRoutes, categoriesRoutes } from './features/category';
import { colorRoutes, colorsRoutes } from './features/color';
import { sizeRoutes, sizesRoutes } from './features/size';

const app: Express = express();

/* CONFIGURATIONS */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ROUTES */
app.use('/api/v1/healthcheck', healthRoutes);

app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/stores', storeRoutes);

app.use('/api/v1/stores', billboardsRoutes);
app.use('/api/v1/billboards', billboardRoutes);

app.use('/api/v1/stores', categoriesRoutes);
app.use('/api/v1/categories', categoryRoutes);

app.use('/api/v1/stores', colorsRoutes);
app.use('/api/v1/colors', colorRoutes);

app.use('/api/v1/stores', sizesRoutes);
app.use('/api/v1/sizes', sizeRoutes);

// Error middleware - Catch custom api errors
app.use(errorMiddleware);

export default app;
