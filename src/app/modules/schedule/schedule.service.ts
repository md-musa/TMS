import { ISchedule } from "./schedule.interface";
import ScheduleModel from "./schedule.model";

const create = async (data: ISchedule) => {
  return await ScheduleModel.create(data);
};

const getAllSchedules = async () => {
  return await ScheduleModel.find();
};

const getAllSchedulesByRoute = async (routeId: string, day: string) => {
  // Fetch schedules based on routeId and day
  const schedules = await ScheduleModel.find({
    routeId,
    operatingDays: { $in: [day] },
  });

  // Group schedules into the required format
  const formattedSchedules = {
    from_campus: {
      student: [] as ISchedule[],
      faculty: [] as ISchedule[],
    },
    to_campus: {
      student: [] as ISchedule[],
      faculty: [] as ISchedule[],
    },
  };

  // Populate the formattedSchedules object
  schedules.forEach((schedule) => {
    if (schedule.direction === "from_campus") {
      if (schedule.userType === "student") {
        formattedSchedules.from_campus.student.push(schedule);
      } else if (schedule.userType === "faculty") {
        formattedSchedules.from_campus.faculty.push(schedule);
      }
    } else if (schedule.direction === "to_campus") {
      if (schedule.userType === "student") {
        formattedSchedules.to_campus.student.push(schedule);
      } else if (schedule.userType === "faculty") {
        formattedSchedules.to_campus.faculty.push(schedule);
      }
    }
  });

  // Sorting function to sort schedules by time (ascending order)
  const sortByTime = (a: ISchedule, b: ISchedule) => a.time.localeCompare(b.time);

  formattedSchedules.from_campus.student.sort(sortByTime);
  formattedSchedules.from_campus.faculty.sort(sortByTime);
  formattedSchedules.to_campus.student.sort(sortByTime);
  formattedSchedules.to_campus.faculty.sort(sortByTime);

  return formattedSchedules;
};

export const ScheduleService = {
  create,
  getAllSchedules,
  getAllSchedulesByRoute,
};
