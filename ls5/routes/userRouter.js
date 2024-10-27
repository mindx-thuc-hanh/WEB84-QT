import { Router } from "express";
import userController from "../controllers/user.js";

const UserRouter = Router();

UserRouter.get("/", userController.getListUser);

UserRouter.post("/", userController.createUser);

export default UserRouter;