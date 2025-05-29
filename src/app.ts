import express, { type Express } from 'express';
import cookieParser from 'cookie-parser';

import { errorMiddleware } from './middlewares/error.middleware';

/* IMPORT ROUTES */
import healthRouter from './api/healthcheck';
import authRouter from './api/auth';
import storeRouter from './api/store';
import { storeBillboardRouter, billboardRouter } from './api/billboard';
import { storeCategoryRouter, categoryRouter } from './api/category';
import { storeColorRouter, colorRouter } from './api/color';
import { storeSizeRouter, sizeRouter } from './api/size';

const app: Express = express();

/* CONFIGURATIONS */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

/* ROUTES */
app.use('/api/v1/healthcheck', healthRouter);

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/stores', storeRouter);

app.use('/api/v1/stores', storeBillboardRouter);
app.use('/api/v1/billboards', billboardRouter);

app.use('/api/v1/stores', storeCategoryRouter);
app.use('/api/v1/categories', categoryRouter);

app.use('/api/v1/stores', storeColorRouter);
app.use('/api/v1/colors', colorRouter);

app.use('/api/v1/stores', storeSizeRouter);
app.use('/api/v1/sizes', sizeRouter);

// Error middleware - Catch custom api errors
app.use(errorMiddleware);

export default app;
