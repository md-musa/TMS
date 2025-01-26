import { Schema } from "mongoose";
import { BUS_STATUS } from "../../../constants";

export interface IBus {
  name: string; 
  serialNumber: number;
  capacity: number;
  status: BUS_STATUS.ACTIVE | BUS_STATUS.INACTIVE | BUS_STATUS.MAINTENANCE; 
  assignedRouteId?: Schema.Types.ObjectId; 
  assignedDriverId?: Schema.Types.ObjectId; 
}
