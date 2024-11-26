import { Router } from "express";
import imageController from "../controllers/imageController.js";
import multer from "multer";

const imageRouter = Router() 

// Khởi tạo tùy chọn lưu trữ memoryStorage
// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'tmp/my-uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage });
// 
imageRouter.post('/upload', upload.array('mindx-images'), imageController.uploadImage)

export default imageRouter