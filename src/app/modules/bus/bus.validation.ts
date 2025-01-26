import { z } from "zod";
import { BUS_STATUS } from "../../../constants";

export const create = z.object({
  body: z.object({
    name: z.string().nonempty("Bus number is required"),
    serialNumber: z.number().int("Bus number is required").positive("Serial number must be a positive integer"),
    capacity: z.number().int().positive("Capacity must be a positive integer"),
    status: z.enum([BUS_STATUS.ACTIVE, BUS_STATUS.INACTIVE, BUS_STATUS.MAINTENANCE]),
    assignedRouteId: z.string().length(24, "Invalid MongoDB ObjectId").optional(),
    assignedDriverId: z.string().length(24, "Invalid MongoDB ObjectId").optional(),
  }),
});

export const BusValidation = { create };