import mongoose, { Document, Schema, Types } from "mongoose";
import { SCHEDULE_DIRECTIONS, SCHEDULE_OPERATING_DAYS, SCHEDULE_TYPES, SCHEDULE_USER_TYPES } from "../../../constants";

export interface ISchedule {
  routeId: Types.ObjectId;
  direction: SCHEDULE_DIRECTIONS.TO_CAMPUS | SCHEDULE_DIRECTIONS.FROM_CAMPUS;
  time: string; // Time as string in "HH:mm" format
  userType: SCHEDULE_USER_TYPES.STUDENT | SCHEDULE_USER_TYPES.EMPLOYEE;
  type:
    | SCHEDULE_TYPES.REGULAR
    | SCHEDULE_TYPES.FRIDAY
    | SCHEDULE_TYPES.MID_TERM
    | SCHEDULE_TYPES.FINAL_TERM
    | SCHEDULE_TYPES.RAMADAN;
  note: string;
}
