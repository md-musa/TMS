import { z } from "zod";
import { SCHEDULE_DIRECTIONS, SCHEDULE_TYPES, SCHEDULE_USER_TYPES } from "../../../constants";


export const create = z.object({
  body: z.object({
    routeId: z.string().nonempty("Route ID is required"),
    direction: z.enum([SCHEDULE_DIRECTIONS.TO_CAMPUS, SCHEDULE_DIRECTIONS.FROM_CAMPUS]),
    time: z.string().nonempty("Time is required"),
    userType: z.enum([SCHEDULE_USER_TYPES.STUDENT, SCHEDULE_USER_TYPES.EMPLOYEE]),
    type: z.enum([
      SCHEDULE_TYPES.REGULAR,
      SCHEDULE_TYPES.FRIDAY,
      SCHEDULE_TYPES.MID_TERM,
      SCHEDULE_TYPES.FINAL_TERM,
      SCHEDULE_TYPES.RAMADAN,
    ]),
    notes: z.string().optional(),
  }),
});

export const ScheduleValidation = {
  create,
};
