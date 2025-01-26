import { STUDENT_DENSITY } from "../../../constants";

export interface IRoute {
  name: string;
  startLocation: string;
  endLocation: string;
  totalDistance: number; // in kilometers
  estimatedTime: number; // in minutes
  wayline: { latitude: number; longitude: number }[];
  assignedBuses?: { number: string }[];
  waypoints?: {
    location?: string;
    latitude?: number;
    longitude?: number;
    studentDensity?: STUDENT_DENSITY.LOW | STUDENT_DENSITY.MEDIUM | STUDENT_DENSITY.HIGH;
  }[];
}
