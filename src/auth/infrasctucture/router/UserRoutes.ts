import { Router } from "express";
import { registerController, loginController, getAllUsersWithAnimalsController} from "../dependencies";

export const UserRouter = Router();

UserRouter.post('/login', loginController.run.bind(loginController));

UserRouter.post('/register', registerController.run.bind(registerController));

UserRouter.get('/all', getAllUsersWithAnimalsController.run.bind(getAllUsersWithAnimalsController));

