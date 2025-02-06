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
      enum: [SCHEDULE_USER_TYPES.STUDENT, SCHEDULE_USER_TYPES.FACULTY, SCHEDULE_USER_TYPES.ADMIN],
      required: true,
    },
    operatingDays: {
      type: [String], // Array of strings (days of the week)
      enum: [
        SCHEDULE_OPERATING_DAYS.SATURDAY,
        SCHEDULE_OPERATING_DAYS.SUNDAY,
        SCHEDULE_OPERATING_DAYS.MONDAY,
        SCHEDULE_OPERATING_DAYS.TUESDAY,
        SCHEDULE_OPERATING_DAYS.WEDNESDAY,
        SCHEDULE_OPERATING_DAYS.THURSDAY,
        SCHEDULE_OPERATING_DAYS.FRIDAY,
      ],
      required: true,
    },
    type: {
      type: String,
      enum: [SCHEDULE_TYPES.REGULAR, SCHEDULE_TYPES.MID_TERM, SCHEDULE_TYPES.FINAL_TERM],
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the Mongoose model for the Schedule
const ScheduleModel = mongoose.model<ISchedule>("Schedule", scheduleSchema);

export default ScheduleModel;
