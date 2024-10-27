import express from "express";
import userController from "./controllers/user.js";
import mongoose from "mongoose";
import RootRouter from "./routes/index.js";

const app = express();

app.use(express.json());

// router -> controller
// ex: /users (router) -> middleware  -> userController.getListUser (controller) -> UserModel(model)
// /users/:userId Update - Delete  

// const user = UserModel.findById(userId)

// if(!userId) => throw Error user not found



// postman - reactjs (view) -> call api localhost:3000/users -> json array 
// reactjs (view) -> json -> .map(user=><p>{user.userName}</p>)

app.use("/v1", RootRouter);

app.get("/users", userController.getListUser);

app.post("/users", userController.createUser);

await mongoose.connect("mongodb+srv://lesson4-user:CiudcIcuiYJgRQlz@cuahangdienthoai.xtih4.mongodb.net/lesson4-user?retryWrites=true&w=majority&appName=cuahangdienthoai");
app.listen(3000, () => {

    console.log("Server is running on port 3000");
})