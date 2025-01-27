import mongoose, { Schema, model } from "mongoose";
import { ITrip } from "./trip.interface";
import { TRIP_STATUS } from "../../../constants";

const tripSchema = new Schema<ITrip>(
  {
    routeId: { type: String, required: true },
    hostId: { type: String, required: true },
    busId: { type: String, required: true },
    start_time: { type: Date, required: true },
    status: {
      type: String,
      enum: [TRIP_STATUS.SCHEDULED, TRIP_STATUS.ONGOING, TRIP_STATUS.COMPLETED, TRIP_STATUS.CANCELED],
      required: true,
    },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    busType: { type: String, enum: ["student", "faculty"], required: true },
    speed: { type: Number, required: false, default: 0 },
    currentLocation: { type: String, required: false, default: "" },
  },
  { timestamps: true }
);

export const TripModel = model<ITrip>("Trip", tripSchema);