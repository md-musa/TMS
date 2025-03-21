import { z } from "zod";
import { BUS_TYPES, TRIP_STATUS } from "../../../constants";

export const create = z.object({
  body: z.object({
    routeId: z.string().nonempty("Route ID required"),
    hostId: z.string().nonempty("Host ID required"),
    busId: z.string().nonempty("Host ID required"),
    start_time: z.coerce.date(),
    status: z.enum([TRIP_STATUS.SCHEDULED, TRIP_STATUS.ONGOING, TRIP_STATUS.COMPLETED, TRIP_STATUS.CANCELED]),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    busType: z.enum([BUS_TYPES.STUDENT, BUS_TYPES.EMPLOYEE]),
    speed: z.number().min(0, "Speed must be positive").optional().default(0),
    currentLocation: z.string().optional().default(""),
  }),
});

export const TripValidation = {
  create,
};
