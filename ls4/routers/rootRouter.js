
import { Route, Router } from "express";
import postRouter from "./postRouter.js";
import rootController from "../controllers/rootController.js";

const rootRouter = Router()


rootRouter.get('/', rootController.index)

rootRouter.use('/posts', postRouter)


export default rootRouter