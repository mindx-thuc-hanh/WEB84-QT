import UsersModel from "../models/users.js"
import bcrypt from "bcrypt"

const userController = {
    register: async (req, res) => {
        const { email, password } = req.body

        try {
            // is valid input
            if (!email || !password) throw {
                message: "Bad request",
                status: 400
            }

            // valid is email existed
            const isExisted = await UsersModel.findOne({
                email
            })

            if (isExisted) throw {
                message: "Email existed",
                status: 400
            }

            // tạo chuỗi ngẫu nhiên
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt)
            // create new user
            const newUser = await UsersModel.create({
                email: email,
                hashedPassword: hashedPassword,
                salt
            })

            res.status(200).send({
                message: "Success",
                newUser
            })
        }
        catch (err) {
            res.status(err.status).send({
                err: err.message
            })
        }

    },

    login: async (req, res) => {
        const { email, password } = req.body

        try {
            // is valid input
            if (!email || !password) throw {
                message: "Bad request",
                status: 400
            }


            // Query user
            const user = await UsersModel.findOne({
                email,
            },)

            if (!user) throw {
                message: "User not found",
                status: 404
            }

            // const hashedPassword = bcrypt.compareSync(password, user.hashedPassword)

            // if (!hashedPassword) throw {
            //     message: "Incorrect password",
            //     status: 401
            // }
            const hashedPassword = bcrypt.hashSync(password, user.salt)

            if (user.hashedPassword !== hashedPassword) throw {
                message: "Incorrect password",
                status: 401
            }

            res.status(200).send({
                message: "Success",
                user
            })
        }
        catch (err) {
            res.status(err.status || 500).send({
                err: err.message
            })
        }
    },

    // [GET] /get-users
    getListUser: async (req, res) => {
        try {
            const listUser = await UsersModel.find()

            return res.status(200).send(listUser)
        } catch (err) {
            res.status(err.status || 500).send({
                err: err.message
            })
        }
    }
}

export default userController