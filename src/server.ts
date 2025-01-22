import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import config from "./config";
// import { errorlogger, logger } from "./shared/logger";

let server: Server;

const main = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("✅ Database connected successfully");

    server = app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
    });
  } catch (error) {
    console.log("❌ Database connection failed", error);
    process.exit(1);
  }
};

main();


  // const exitHandler = (reason: string) => {
  //   console.log(`⚠ Shutting down due to ${reason}`);
  //   if (server) {
  //     server.close(() => {
  //       console.log("🔴 Server closed");
  //       process.exit(1);
  //     });
  //   } else {
  //     process.exit(1);
  //   }
  // };

  // process.on("uncaughtException", (error) => {
  //   console.log("❗ Uncaught Exception:", error);
  //   exitHandler("uncaughtException");
  // });

  // process.on("unhandledRejection", (reason) => {
  //   console.log("❗ Unhandled Rejection:", reason);
  //   exitHandler("unhandledRejection");
  // });

  // process.on("SIGTERM", () => exitHandler("SIGTERM"));