import { Server as SocketIOServer } from "socket.io";
import { Server as ExpressServer } from "http";
import app, { socketHandler } from "./app";
import mongoose from "mongoose";
import config from "./config";
import { logger } from "./shared/logger";

export let expressServer: ExpressServer;
export let io: SocketIOServer;

const main = async () => {
  try {
    await mongoose.connect(config.DATABASE_URL as string);
    logger.info("✅ Database connected successfully");

    // Start Express server
    expressServer = app.listen(config.PORT, () => {
      logger.info(`🚀 Server running on port ${config.PORT}`);
    });

    // Initialize Socket.IO
    io = new SocketIOServer(expressServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });


    io.on("connection", socketHandler);

  } catch (error) {
    logger.error("❌ Database connection failed", error);
    process.exit(1);
  }

  // Graceful Shutdown
  const shutdownServer = (reason: string) => {
    console.log(`⚠ Shutting down due to ${reason}`);

    if (expressServer) {
      expressServer.close(() => {
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
