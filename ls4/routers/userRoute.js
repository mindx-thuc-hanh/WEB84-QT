import { Router } from "express";
import userController from "../controllers/userController.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";

const userRouter = Router()

// register, login => public routes 


// xem phim. mua ve online register => login => mua ve => ticket(token) => get-into-cinema 


// login => token 

// get-users => private routes


// public route
userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)
userRouter.get('/refresh-token', userController.refreshToken)


// private route
// userRouter.get('/get-user', userController.getDetailUser)
userRouter.get('/get-users', userMiddleware.isAuthenticated, userController.getListUser)
userRouter.get('/user-info/:email', userMiddleware.isAuthenticated, userController.getDetailUser)

// delete user 
userRouter.delete('/delete-user/:email', userMiddleware.isAuthenticated, userController.deleteUser)

export default userRouter