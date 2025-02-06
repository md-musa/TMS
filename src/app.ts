import "express-async-errors";
import cors from "cors";
import cookieParser from "cookie-parser";
import express, { Application, NextFunction, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import routeNotFoundError from "./app/middlewares/routeNotFoundError";
import { AuthRouter } from "./app/modules/auth/auth.route";
import { BusRouter } from "./app/modules/bus/bus.route";
import { RouteRouter } from "./app/modules/route/route.route";
import { TripRouter } from "./app/modules/trip/trip.route";
import { logger } from "./shared/logger";
import { SOCKET_EVENTS } from "./constants";
import { BusModel } from "./app/modules/bus/bus.model";
import ApiError from "./errors/ApiError";
import { stat } from "fs";
import { io } from "./server";
import { ScheduleRouter } from "./app/modules/schedule/schedule.route";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.url);
  next();
});

// routes
app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD");
});

// Tasks
// -------------------
// 1. Create trip apis with Socket io;
// 2. Test socket api with Websocket king

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/buses", BusRouter);
app.use("/api/v1/routes", RouteRouter);
app.use("/api/v1/trips", TripRouter);
app.use("/api/v1/schedules", ScheduleRouter);
app.use(globalErrorHandler);
app.use(routeNotFoundError);
// ---------------------------
// Socket IO
// ---------------------------

export const socketHandler = (socket: any) => {
  console.log(`🟢 New client connected: ${socket.id}`);

  // 1️⃣ User joins a route-specific room
  socket.on(SOCKET_EVENTS.JOIN_ROUTE, (routeId: string) => {
    socket.join(routeId);
    console.log(`👥 Client ${socket.id} joined route: ${routeId}`);
  });

  // 2️⃣ Bus broadcasts location updates
  socket.on(SOCKET_EVENTS.BROADCAST_BUS_LOCATION, async (data: any) => {
    const { routeId, busId, hostId, busType, latitude, longitude } = data;

    try {
      const busInfo = await BusModel.findById(busId);

      if (!busInfo) {
        throw ApiError.notFound(`❌ Bus with ID ${busId} not found`);
      }

      const busData = {
        busId,
        name: busInfo.name,
        serialNumber: busInfo.serialNumber,
        capacity: busInfo.capacity,
        status: busInfo.status,
        latitude,
        longitude,
        busType,
        hostId,
      };

      io.to(routeId).emit("bus-location-update", busData);

      console.log(
        `📡 Broadcasted bus ${busId} (${busInfo.name + "-" + busInfo.serialNumber}) location on route ${routeId}`
      );
    } catch (error) {
      console.error("❌ Error fetching bus data:", error);
    }
  });

  // 3️⃣ User requests live bus locations
  socket.on("view-locations", (routeId: string) => {
    console.log(`👀 User requested bus locations for route: ${routeId}`);

    // Notify bus drivers to send updates
    socket.to(routeId).emit("request-bus-location");
  });

  // 4️⃣ Handle disconnection
  socket.on("disconnect", () => {
    console.log(`🔴 Client disconnected: ${socket.id}`);
  });
};

export default app;
