
import { Route, Router } from "express";
import postRouter from "./postRouter.js";
import rootController from "../controllers/rootController.js";
import userRouter from "./userRoute.js";
import imageRouter from "./imageRouter.js";

const rootRouter = Router()


rootRouter.get('/', rootController.index)

rootRouter.use('/users', userRouter)

rootRouter.use('/posts', postRouter)

rootRouter.use('/image', imageRouter)


export default rootRouter