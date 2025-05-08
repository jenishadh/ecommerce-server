import fs from "fs";
import path from "path";
import { createLogger, transports, format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

import { environment, logDirectory } from "../config";

// Resolve and ensure log directory exists
const dir = path.resolve(logDirectory ?? "logs");

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const logLevel = environment === "development" ? "debug" : "warn";

// Daily rotate file transport
const dailyRotateFile = new DailyRotateFile({
  level: logLevel,
  filename: path.join(dir, "%DATE%-results.log"),
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  handleExceptions: true,
  maxSize: "20m",
  maxFiles: "14d",
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
});

// Create logger
const logger = createLogger({
  level: logLevel,
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ level, message, timestamp, stack }) =>
          stack
            ? `${timestamp} ${level}: ${stack}`
            : `${timestamp} ${level}: ${message}`
        )
      ),
    }),
    dailyRotateFile,
  ],
  exceptionHandlers: [dailyRotateFile],
  exitOnError: false,
});

export default logger;
