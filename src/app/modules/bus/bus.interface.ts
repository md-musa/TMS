import { Schema } from "mongoose";
import { BUS_STATUS, BUS_TYPES } from "../../../constants";

export interface IBus {
  name: string; 
  capacity: number;
  busType: BUS_TYPES.STUDENT | BUS_TYPES.EMPLOYEE;
  status: BUS_STATUS.ACTIVE | BUS_STATUS.INACTIVE | BUS_STATUS.MAINTENANCE; 
  assignedRouteId?: Schema.Types.ObjectId; 
  assignedDriverId?: Schema.Types.ObjectId; 
}
