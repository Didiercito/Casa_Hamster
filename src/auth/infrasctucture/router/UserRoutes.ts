import { Router } from "express";
import { registerController, loginController, getAllUsersWithAnimalsController, logoutController} from "../dependencies";
import { authenticateJWT } from "../../../middlewares/Auth";
export const UserRouter = Router();

UserRouter.post('/login', loginController.run.bind(loginController));

UserRouter.post('/register', registerController.run.bind(registerController));

UserRouter.get('/all', getAllUsersWithAnimalsController.run.bind(getAllUsersWithAnimalsController));

UserRouter.post('/logout', authenticateJWT, logoutController.run.bind(logoutController));
