import UserModel from "../models/user.js";

const userController = {
    getListUser: async (req, res) => {
        try {
            const users = await UserModel.find();
            res.json(users);
        } catch (error) {
            res.status(500).send
        }
    },
    createUser: async (req, res) => {
        try {
            const user = req.body;
            const newUser = new UserModel(user);
            await newUser.save();
            res.json(newUser);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    // access token usage
    // user story: I am a customer, i want know my information in your system

    // refresh_token
    // /login -> json {message:'Authenticated',token:'asdasdahsdkjhsa-{{userId}}-dkjhsakdjhsakdhkas'}
    // -> req.body ={token:'asdasdahsdkjhsa-{{userId}}-dkjhsakdjhsakdhkas' }-> verify token ->/get-user-information UserModel.findById()
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params
            const isExistedUser = await UserModel.findById(id)
            if (!isExistedUser) throw new Error('User not found')


        } catch (err) {
            res.send(err.message)
        }
    },
    updateUser: async (req, res) => {
        try {
            const { id } = req.params
            const isExistedUser = await UserModel.findById(id)
            if (!isExistedUser) throw new Error('User not found')

        } catch (err) {
            res.send(err.message)
        }
    }

}

export default userController;