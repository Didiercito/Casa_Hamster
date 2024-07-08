import { Router } from "express";
import { registerSensorController,getAllSensorController,getByIdSensorController} from "../dependencies"
import { authenticateJWT } from "../../../middlewares/Auth";
export const SensorRoutes = Router();

SensorRoutes.post('/register',authenticateJWT,registerSensorController.run.bind(registerSensorController));

SensorRoutes.get('/all',authenticateJWT ,getByIdSensorController.run.bind(getAllSensorController));

SensorRoutes.get('/:id',authenticateJWT,getByIdSensorController.run.bind(getByIdSensorController));