import express from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post("/register", validateRequest(AuthValidation.register), AuthController.registerUser);
router.post("/login", validateRequest(AuthValidation.login), AuthController.login);

export const AuthRouter = router;
 