import mongoose, { Schema } from "mongoose";
import { ISchedule } from "./schedule.interface";
import { SCHEDULE_DIRECTIONS, SCHEDULE_OPERATING_DAYS, SCHEDULE_TYPES, SCHEDULE_USER_TYPES } from "../../../constants";

const scheduleSchema: Schema<ISchedule> = new Schema(
  {
    routeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route", // Reference to the Routes collection
      required: true,
    },
    direction: {
      type: String,
      enum: [SCHEDULE_DIRECTIONS.TO_CAMPUS, SCHEDULE_DIRECTIONS.FROM_CAMPUS],
      required: true,
    },
    time: {
      type: String, // Store time as string (HH:mm) format
      required: true,
    },
    userType: {
      type: String,
      enum: [SCHEDULE_USER_TYPES.STUDENT, SCHEDULE_USER_TYPES.EMPLOYEE],
      required: true,
    },
    type: {
      type: String,
      enum: [SCHEDULE_TYPES.REGULAR, SCHEDULE_TYPES.FRIDAY, SCHEDULE_TYPES.MID_TERM, SCHEDULE_TYPES.FINAL_TERM, SCHEDULE_TYPES.RAMADAN],
      required: true,
    },
    note: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// Create the Mongoose model for the Schedule
const ScheduleModel = mongoose.model<ISchedule>("Schedule", scheduleSchema);

export default ScheduleModel;
