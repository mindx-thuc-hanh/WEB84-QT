import mongoose from 'mongoose';

// NoSQL 
// structure
const postSchema = new mongoose.Schema({
    userIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }],
    content: String,
    isPublic: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
const PostsModel = mongoose.model('posts', postSchema);
export default PostsModel;