import express from "express";
import { RouteController } from "./route.controller";
import validateRequest from "../../middlewares/validateRequest";
import { RouteValidation } from "./route.validation";

const router = express.Router();

router.get("/", RouteController.getRoutes);
router.post("/", validateRequest(RouteValidation.create), RouteController.addRoute);

export const RouteRouter = router;


// "a to b":
//     {time, to, for, ..}
//     {time, to, for, ..}
//     {time, to, for, ..}
//     {time, to, for, ..}
// ]

// {
//     _id: 1,
//     time: 7:00am,
//     route: campus to mirpur,
//     for: student,
//     to: null,
//     


// }