import express  from 'express';
import validateRequest from "../../middlewares/validateRequest";
import { TripController } from "./trip.controller";
import { TripValidation } from "./trip.validation";

const router = express.Router();

router.post("/",validateRequest(TripValidation.create), TripController.create);

export const TripRouter = router;