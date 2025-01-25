import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import config from "./config";
import { logger } from "./shared/logger";

let server: Server;

const main = async () => {
  try {
    await mongoose.connect(config.DATABASE_URL as string);
    logger.info("✅ Database connected successfully");

    server = app.listen(config.PORT, () => {
      logger.info(`🚀 Server running on port ${config.PORT}`);
    });
  } catch (error) {
    logger.error("❌ Database connection failed", error);
    process.exit(1);
  }

  const shutdownServer = (reason: string) => {
    console.log(`⚠ Shutting down due to ${reason}`);

    if (server) {
      server.close(() => {
        console.log("🔴 Server closed");
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };

  process.on("uncaughtException", (error) => {
    console.log("❗ Uncaught Exception:", error);
    shutdownServer("uncaughtException");
  });

  process.on("unhandledRejection", (reason) => {
    console.log("❗ Unhandled Rejection:", reason);
    shutdownServer("unhandledRejection");
  });

  process.on("SIGTERM", () => shutdownServer("SIGTERM"));
};

main();
