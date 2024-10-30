import { Router } from "express";
import userController from "../controllers/userController.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";

const userRouter = Router()


// public route
userRouter.post('/register', userController.register)
userRouter.post('/login',  userController.login)


// private route
// userRouter.get('/get-user', userController.getDetailUser)
userRouter.get('/get-users',userMiddleware.isValidAdmin, userController.getListUser)

export default userRouter