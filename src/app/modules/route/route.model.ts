import mongoose, { Schema, model } from "mongoose";
import { STUDENT_DENSITY } from "../../../constants";
import { IRoute } from "./route.interface";

const routeSchema = new Schema<IRoute>(
  {
    name: { type: String, required: true },
    startLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    totalDistance: { type: Number, required: true }, // in kilometers
    estimatedTime: { type: Number, required: true }, // in minutes
    wayline: [
      {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
      },
    ],
    assignedBuses: [
      {
        number: { type: String, required: false },
      },
    ],
    waypoints: [
      {
        location: { type: String, required: false },
        latitude: { type: Number, required: false },
        longitude: { type: Number, required: false },
        studentDensity: {
          type: String,
          enum: [STUDENT_DENSITY.LOW, STUDENT_DENSITY.MEDIUM, STUDENT_DENSITY.HIGH],
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

export const RouteModel = model<IRoute>("Route", routeSchema);
