import mongoose, { Schema } from "mongoose";
import { IBus } from "./bus.interface";
import { BUS_STATUS, BUS_TYPES } from "../../../constants";

const BusSchema = new Schema<IBus>(
  {
    name: { type: String, unique: true,lowercase: true, required: true},
    busType: { type: String, enum: Object.values(BUS_TYPES), required: true },
    capacity: { type: Number, required: true, min: 1 },
    status: { type: String, enum: Object.values(BUS_STATUS), required: true },
    assignedRouteId: { type: Schema.Types.ObjectId, ref: "Route", default: null, required: false },
    assignedDriverId: { type: Schema.Types.ObjectId, ref: "User", default: null, required: false },
  },
  { timestamps: true }
);
export const BusModel = mongoose.model<IBus>("Bus", BusSchema);
