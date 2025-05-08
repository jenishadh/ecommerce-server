import { Request, Response } from "express";

import logger from "../../lib/logger";
import { environment } from "../../config";
import { version } from "../../../package.json";
import { InternalError } from "../../lib/custom-error";

export async function healthCheck(req: Request, res: Response) {
  try {
    const healthStatus = {
      status: "available",
      environment,
      version,
      timestamp: new Date(),
    };
    // throw new Error("Simulated error for testing");
    res.status(200).json(healthStatus);
  } catch (error) {
    logger.error("Health check failed: ", error);
    throw new InternalError();
  }
}
