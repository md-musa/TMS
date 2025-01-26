import  express  from 'express';
import { RouteController } from './route.controller';
import validateRequest from '../../middlewares/validateRequest';
import { RouteValidation } from './route.validation';


const router = express.Router();

router.post("/",validateRequest(RouteValidation.create), RouteController.addRoute);

export const RouteRouter = router;