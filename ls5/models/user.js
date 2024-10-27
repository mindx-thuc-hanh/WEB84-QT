import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    address: String,
    email: {
        type: String,
        required: true,
        unique: true
    }
});

const UserModel = mongoose.model('User', schema);

export default UserModel;