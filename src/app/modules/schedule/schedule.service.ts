import { ISchedule } from "./schedule.interface";
import ScheduleModel from "./schedule.model";

const create = async (data: ISchedule) => {
  return await ScheduleModel.create(data);
};

const getAllSchedules = async () => {
  return await ScheduleModel.find();
};

const getAllSchedulesByRoute = async (routeId: string) => {
  return await ScheduleModel.find({ routeId }).populate("routeId", "name startLocation endLocation").sort({ time: 1 });
};

export const ScheduleService = {
  create,
  getAllSchedules,
  getAllSchedulesByRoute
};
