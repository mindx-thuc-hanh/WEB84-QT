import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    age: String,
    avatar: String,
    // posts: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'posts'
    // }]
});
const UsersModel = mongoose.model('users', userSchema);
export default UsersModel;