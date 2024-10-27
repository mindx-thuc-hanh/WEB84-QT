import express from 'express';
import mongoose from 'mongoose';
import rootRouter from './routers/rootRouter.js';

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

app.use('/', rootRouter)


app.listen(3000, () => {
    connectDb()
    console.log('Server is running!');
});
