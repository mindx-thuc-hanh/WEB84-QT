import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    userName: String,
    email: {
        type: String,
        required: true
    },
    age: String,
    avatar: String,
    hashedPassword: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
    // posts: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'posts'
    // }]
});
const UsersModel = mongoose.model('users', userSchema);
export default UsersModel;