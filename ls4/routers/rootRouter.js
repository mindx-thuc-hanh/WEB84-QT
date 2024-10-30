
import { Route, Router } from "express";
import postRouter from "./postRouter.js";
import rootController from "../controllers/rootController.js";
import userRouter from "./userRoute.js";

const rootRouter = Router()


rootRouter.get('/', rootController.index)

rootRouter.use('/users', userRouter)

rootRouter.use('/posts', postRouter)


export default rootRouter