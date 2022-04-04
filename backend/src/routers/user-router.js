import {Router} from "express";
import UserController from "../controllers/user-controller";

const UserRouter = Router();

UserRouter.get('/api/users', UserController.showTopTenSolvers);

export default UserRouter;
