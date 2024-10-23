import mongoose from 'mongoose';
const commentsSchema = new mongoose.Schema({
    postId: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        
    },
    content: String,
});
// định nghĩa model cần truyền với phương thức model và các tham số lần lượt: tên collections, schema của document
const CommentsModel = mongoose.model('comments', commentsSchema);
export default CommentsModel;