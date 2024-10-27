import { Router } from "express";
import UserRouter from "./userRouter.js";

const RootRouter = Router();

RootRouter.get('/', (req, res) => {
    res.send("Hello World!");
});

RootRouter.use('/users', UserRouter);

export default RootRouter;