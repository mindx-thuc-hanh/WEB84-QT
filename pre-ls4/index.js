import express from 'express';
import mongoose from 'mongoose';

const app = express();

const connectionString = `mongodb+srv://lesson4-user:CiudcIcuiYJgRQlz@cuahangdienthoai.xtih4.mongodb.net/?retryWrites=true&w=majority&appName=cuahangdienthoai`


const connectDb = async () => {
    try {

        await mongoose.connect(connectionString)
        console.log('Ket noi database thanh cong')
    } catch (err) {
        console.log(`Khong ket noi duoc database ${err}`)
        process.exit(1)
    }
}

app.listen(8080, () => {
    connectDb()
    console.log('Server is running!');
});

