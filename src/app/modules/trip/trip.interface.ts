import { Schema } from "mongoose";
import { BUS_STATUS, BUS_TYPE, TRIP_STATUS } from "../../../constants";

export interface ITrip {
  routeId: Schema.Types.ObjectId;
  hostId: Schema.Types.ObjectId;
  busId: Schema.Types.ObjectId;
  start_time: Date;
  status: TRIP_STATUS.SCHEDULED | TRIP_STATUS.ONGOING | TRIP_STATUS.COMPLETED | TRIP_STATUS.CANCELED;
  latitude: number;
  longitude: number;
  busType: BUS_TYPE.STUDENT | BUS_TYPE.FACULTY;
  speed?: number;
  currentLocation?: string;
}
