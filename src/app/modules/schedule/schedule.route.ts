import express from "express";
import { ScheduleController } from "./schedule.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ScheduleValidation } from "./schedule.validation";

const router = express.Router();

router.get("/", ScheduleController.getAllSchedules);
router.post("/", validateRequest(ScheduleValidation.create), ScheduleController.create);
router.get("/get-single-route-schedule", ScheduleController.getAllSchedulesByRoute);

export const ScheduleRouter = router;
