import app from "./app";
import db from "./lib/db";
import logger from "./lib/logger";
import { port } from "./config";

async function startServer() {
  try {
    await db.$connect();
    logger.info("Database connected successfully.");
    app.listen(port, () => {
      logger.info(`Server running at port ${port}`);
    });
  } catch {
    logger.error("Error connecting to the database!");
    process.exit(1);
  }
}

startServer();
