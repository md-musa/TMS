import { z } from "zod";
import { SCHEDULE_DIRECTIONS, SCHEDULE_OPERATING_DAYS, SCHEDULE_TYPES, SCHEDULE_USER_TYPES } from "../../../constants";

// Define Zod validation schema for the Schedule model
export const create = z.object({
  body: z.object({
    routeId: z.string().nonempty(),
    direction: z.enum([SCHEDULE_DIRECTIONS.TO_CAMPUS, SCHEDULE_DIRECTIONS.FROM_CAMPUS]),
    time: z.string().nonempty(),
    userType: z.enum([SCHEDULE_USER_TYPES.STUDENT, SCHEDULE_USER_TYPES.FACULTY, SCHEDULE_USER_TYPES.ADMIN]),
    operatingDays: z
      .array(
        z.enum([
          SCHEDULE_OPERATING_DAYS.SATURDAY,
          SCHEDULE_OPERATING_DAYS.SUNDAY,
          SCHEDULE_OPERATING_DAYS.MONDAY,
          SCHEDULE_OPERATING_DAYS.TUESDAY,
          SCHEDULE_OPERATING_DAYS.WEDNESDAY,
          SCHEDULE_OPERATING_DAYS.THURSDAY,
          SCHEDULE_OPERATING_DAYS.FRIDAY,
        ])
      )
      .min(1, "At least one operating day is required"),
    type: z.enum([SCHEDULE_TYPES.REGULAR, SCHEDULE_TYPES.MID_TERM, SCHEDULE_TYPES.FINAL_TERM]),
    notes: z.string().optional(),
  }),
});

export const ScheduleValidation = {
  create,
};
