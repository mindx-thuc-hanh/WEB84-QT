import { Router } from "express";
import PostsModel from "../models/posts.js";
import postController from "../controllers/postController.js";

const postRouter = Router()

postRouter
    .route('/')
    .post(postController.createPost)
    .get(postController.getPost)

export default postRouter