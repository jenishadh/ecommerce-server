import express, { Express } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";

import { corsOrigin } from "./config";
import { catchError } from "./middlewares/catch-error";
/*IMPORT ROUTES*/
import healthCheckRouter from "./app/healthcheck";

const app: Express = express();

/*CONFIGURATIONS*/
app.use(
  cors({
    origin: corsOrigin,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*ROUTES*/
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
    status: "success",
  });
});

app.use("/api/v1/healthcheck", healthCheckRouter);

app.use(catchError);

export default app;
