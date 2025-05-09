import { SCHEDULE_OPERATING_DAYS } from "./../../../constants/index";
import { Request, Response } from "express";
import { ISchedule } from "./schedule.interface";
import { format, parse } from "date-fns";
import { ScheduleService } from "./schedule.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiError";
import config from "../../../config";
import { SCHEDULE_MODES } from "../../../constants";

const create = async (req: Request, res: Response) => {
  const data: ISchedule = req.body;

  data.time = format(parse(data.time, "hh:mm a", new Date()), "HH:mm");
  console.log(data.time); // "22:30"

  const result = await ScheduleService.create(data);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Schedule created successfully",
    data: result,
  });
};
const getAllSchedules = async (req: Request, res: Response) => {
  const result = await ScheduleService.getAllSchedules();

  // for (let i = 0; i < result.length; i++) {
  //   result[i].time = format(parse(result[i].time, "HH:mm", new Date()), "hh:mm a");
  //   console.log(result[i].time);
  // }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Schedules are fetched successfully",
    data: result,
  });
};

const getAllSchedulesByRoute = async (req: Request, res: Response) => {
  let { routeId, day } = req.query;
  if (!routeId) throw ApiError.badRequest("Route id is required");

  const scheduleMode = config.APP_VARIABLES.SCHEDULE_MODE;
  if (day !== SCHEDULE_OPERATING_DAYS.FRIDAY) day = SCHEDULE_OPERATING_DAYS.WEEKDAYS;

  const result = await ScheduleService.getAllSchedulesByRoute(routeId as string, scheduleMode, day);

  // for (let i = 0; i < result.length; i++) {
  //   result[i].time = format(parse(result[i].time, "HH:mm", new Date()), "hh:mm a");
  //   console.log(result[i].time);
  // }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Schedules are fetched successfully",
    data: result,
  });
};

export const ScheduleController = {
  create,
  getAllSchedules,
  getAllSchedulesByRoute,
};
