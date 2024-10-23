import express from 'express';
import mongoose from 'mongoose';
import PostsModel from './models/posts.js';
import UsersModel from './models/users.js';

const app = express();

const connectionString = `mongodb+srv://lesson4-user:CiudcIcuiYJgRQlz@cuahangdienthoai.xtih4.mongodb.net/lesson4-user?retryWrites=true&w=majority&appName=cuahangdienthoai`

app.use(express.json())

const connectDb = async () => {
    try {

        await mongoose.connect(connectionString)
        console.log('Ket noi database thanh cong')
    } catch (err) {
        console.log(`Khong ket noi duoc database ${err}`)
        process.exit(1)
    }
}

app.post('/posts', async (req, res) => {
    try {
        const newPost = await PostsModel.create(req.body)
        res.send(newPost)
    } catch (err) {
        res.send(err)
    }
})

app.get('/posts', async (req, res) => {
    try {
        const posts = await PostsModel.find({})
        res.send(posts)
    } catch (err) {
        res.send(err)
    }
})

app.listen(3000, () => {
    connectDb()
    console.log('Server is running!');
});
