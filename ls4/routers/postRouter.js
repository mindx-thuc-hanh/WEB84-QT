import { Router } from "express";
import PostsModel from "../models/posts.js";
import postController from "../controllers/postController.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";

const postRouter = Router()

// 
postRouter
    .route('/')
    .post( postController.createPost)
    .get( postController.getPost)

export default postRouter