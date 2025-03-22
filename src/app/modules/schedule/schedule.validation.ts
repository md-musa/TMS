import { SCHEDULE_OPERATING_DAYS } from './../../../constants/index';
import { z } from "zod";
import { SCHEDULE_DIRECTIONS, SCHEDULE_MODES, SCHEDULE_USER_TYPES } from "../../../constants";


export const create = z.object({
  body: z.object({
    routeId: z.string().nonempty("Route ID is required"),
    direction: z.enum([SCHEDULE_DIRECTIONS.TO_CAMPUS, SCHEDULE_DIRECTIONS.FROM_CAMPUS]),
    time: z.string().nonempty("Time is required"),
    userType: z.enum([SCHEDULE_USER_TYPES.STUDENT, SCHEDULE_USER_TYPES.EMPLOYEE]),
    mode: z.enum([
      SCHEDULE_MODES.REGULAR,
      SCHEDULE_MODES.MID_TERM,
      SCHEDULE_MODES.FINAL_TERM,
      SCHEDULE_MODES.RAMADAN,
    ]),
    operatingDays: z.enum([
     SCHEDULE_OPERATING_DAYS.WEEKDAYS,
     SCHEDULE_OPERATING_DAYS.FRIDAY,
    ]),
    notes: z.string().optional(),
  }),
});

export const ScheduleValidation = {
  create,
};
