import { SCHEDULE_DIRECTIONS, SCHEDULE_USER_TYPES } from "../../../constants";
import { ISchedule } from "./schedule.interface";
import ScheduleModel from "./schedule.model";

const create = async (data: ISchedule) => {
  return await ScheduleModel.create(data);
};

const getAllSchedules = async () => {
  return await ScheduleModel.find();
};

const getAllSchedulesByRoute = async (routeId: string, routineType: string) => {
  const schedules = await ScheduleModel.find({
    routeId,
    type: routineType,
  });

  // Group schedules into the required format
  const formattedSchedules = {
    from_campus: {
      student: [] as ISchedule[],
      employee: [] as ISchedule[],
    },
    to_campus: {
      student: [] as ISchedule[],
      faculty: [] as ISchedule[],
    },
  };

  // Populate the formattedSchedules object
  schedules.forEach((schedule) => {
    if (schedule.direction === SCHEDULE_DIRECTIONS.FROM_CAMPUS) {
      if (schedule.userType === SCHEDULE_USER_TYPES.STUDENT) {
        formattedSchedules.from_campus.student.push(schedule);
      } else if (schedule.userType === SCHEDULE_USER_TYPES.EMPLOYEE) {
        formattedSchedules.from_campus.employee.push(schedule);
      }
    } else if (schedule.direction === SCHEDULE_DIRECTIONS.TO_CAMPUS) {
      if (schedule.userType === SCHEDULE_USER_TYPES.STUDENT) {
        formattedSchedules.to_campus.student.push(schedule);
      } else if (schedule.userType === SCHEDULE_USER_TYPES.EMPLOYEE) {
        formattedSchedules.to_campus.faculty.push(schedule);
      }
    }
  });

  // Sorting function to sort schedules by time (ascending order)
  const sortByTime = (a: ISchedule, b: ISchedule) => a.time.localeCompare(b.time);

  formattedSchedules.from_campus.student.sort(sortByTime);
  formattedSchedules.from_campus.employee.sort(sortByTime);
  formattedSchedules.to_campus.student.sort(sortByTime);
  formattedSchedules.to_campus.faculty.sort(sortByTime);

  return formattedSchedules;
};

export const ScheduleService = {
  create,
  getAllSchedules,
  getAllSchedulesByRoute,
};
