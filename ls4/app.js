import express from 'express';
import mongoose from 'mongoose';
import rootRouter from './routers/rootRouter.js';
import cors from 'cors';


const app = express();
app.use(cors())

const connectionString = `mongodb+srv://lesson4-user:CiudcIcuiYJgRQlz@cuahangdienthoai.xtih4.mongodb.net/lesson4-user?retryWrites=true&w=majority&appName=cuahangdienthoai`
// const connectionString = `mongodb+srv://lesson:2YR6qIcWguglD1Ra@thang.mcnah.mongodb.net/midterm?retryWrites=true&w=majority&appName=Thang`

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


app.use('/hello-fe', (req, res) => {
    res.send('Hello hi')
})

app.use('/', rootRouter)


app.listen(3000, () => {
    connectDb()
    console.log('Server is running!');
});

// template, config, compiler

// node js là gì
// api là gì

// deployment: 