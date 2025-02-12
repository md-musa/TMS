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
import UserModel from "./app/modules/auth/auth.model";

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

  // 2️⃣ Bus broadcasts location updates along with user count and host name
  socket.on(SOCKET_EVENTS.BROADCAST_BUS_LOCATION, async (data: any) => {
    const { routeId, busId, hostId, busType, latitude, longitude } = data;

    try {
      const busInfo = await BusModel.findById(busId).select("name serialNumber capacity status");

      if (!busInfo) {
        throw new ApiError(404, `❌ Bus with ID ${busId} not found`);
      }

      const hostInfo = await UserModel.findById(hostId).select("name");
      const currentlyConnectedUserCount = io.sockets.adapter.rooms.get(routeId)?.size || 0;

      const responseData = {
        routeId,
        bus: {
          id: busId,
          name: busInfo.name,
          serialNumber: busInfo.serialNumber,
          capacity: busInfo.capacity,
          status: busInfo.status,
          type: busType,
        },
        location: {
          latitude,
          longitude,
        },
        host: {
          id: hostId,
          name: hostInfo ? hostInfo.name : "Unknown",
        },
        currentlyConnectedUserCount,
        timestamp: new Date().toISOString(),
      };

      io.to(routeId).emit(SOCKET_EVENTS.BUS_LOCATION_UPDATE, responseData);

      console.log(
        `📡 Broadcasted bus ${busId} (${busInfo.name}-${busInfo.serialNumber}) on route ${routeId} | Host: ${responseData.host.name} | Users: ${currentlyConnectedUserCount}`
      );
    } catch (error) {
      console.error("❌ Error fetching bus or host data:", error);
    }
  });

  // 4️⃣ Handle disconnection
  socket.on("disconnect", () => {
    console.log(`🔴 Client disconnected: ${socket.id}`);
  });
};

export default app;
