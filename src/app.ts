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
app.use(globalErrorHandler);
app.use(routeNotFoundError);
// ---------------------------
// Socket IO
// ---------------------------

export const socketHandler = (socket: any) => {
  console.log(`🟢 New client connected: ${socket.id}`);

  // 1️⃣ User joins a route-specific room
  socket.on("join-route", (routeId: string) => {
    socket.join(routeId);
    console.log(`👥 Client ${socket.id} joined route: ${routeId}`);
  });

  // 2️⃣ Bus broadcasts location updates
  socket.on("broadcast-location", ({ routeId, location }) => {
    console.log(`📍 Bus on route ${routeId} shared location:`, location);

    // Broadcast to all users in the same route room
    socket.to(routeId).emit("bus-location-update", { location, routeId });
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
