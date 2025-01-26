import { z } from "zod";
import { STUDENT_DENSITY } from "../../../constants";

export const create = z.object({
  body: z.object({
    name: z.string().nonempty("Route name is required"),
    startLocation: z.string().nonempty("Start location is required"),
    endLocation: z.string().nonempty("End location is required"),
    totalDistance: z.number().positive("Total distance must be positive"),
    estimatedTime: z.number().positive("Estimated time must be positive"),
    wayline: z
      .array(
        z.object({
          latitude: z.number(),
          longitude: z.number(),
        })
      )
      .nonempty("Wayline must have at least one point"),
    assignedBuses: z.array(
      z
        .object({
          number: z.string().nonempty("Bus number is required"),
        })
        .optional()
    ),
    waypoints: z
      .array(
        z.object({
          location: z.string().optional(),
          latitude: z.number().optional(),
          longitude: z.number().optional(),
          studentDensity: z.enum([STUDENT_DENSITY.LOW, STUDENT_DENSITY.MEDIUM, STUDENT_DENSITY.HIGH]).optional(),
        })
      )
      .optional(),
  }),
});

export const RouteValidation = {
  create,
};
