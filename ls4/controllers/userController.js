import UsersModel from "../models/users.js"
import bcrypt from "bcrypt" // node package
import { decodeToken, generateRefreshToken, generateToken } from "../utils/jwt.js"



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


    // =>
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


            const token = generateToken({
                userId: user._id
            })
            const refreshToken = generateRefreshToken({
                userId: user._id
            })

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
                user,
                accessToken: token,
                refreshToken
            })
        }
        catch (err) {
            res.status(err.status || 500).send({
                err: err.message
            })
        }
    },
    refreshToken: async (req, res) => {
        try {
            const { refreshToken } = req.body


            const decode = decodeToken(refreshToken)

            const user = await UsersModel.findById(decode.userId)

            if (!user) throw {
                message: "User not found",
                status: 404
            }
            const accessToken = generateToken({
                userId: user._id
            })

            res.send({
                accessToken: accessToken
            })
        } catch (err) {
            res.status(err.status || 500).send({
                err: err.message
            })
        }
    },

    // [GET] /user-info
    getDetailUser: async (req, res) => {
        try {
            const { email } = req.params
            const inSectionUser = req.user
            if (!inSectionUser.isAdmin) {

                const user = await UsersModel.findOne({
                    $and: [{
                        email
                    }, {
                        email: inSectionUser.email
                    }]
                })
                res.status(200).send(user)
            } else {
                console.log(email)
                const user = await UsersModel.findOne({
                    email
                })
                res.status(200).send(user)
            }
        } catch (err) {
            res.status(err.status || 500).send({
                err: err.message
            })
        }
    },

    // [GET] /get-users
    getListUser: async (req, res) => {
        try {

            // const {
            //     accessToken
            // } = req.body


            // const listUser = await UsersModel.find()
            // random 100 users with {email, _id}
            // const listUser = tempListUser.map((v, index) => ({ ...v, index }))

            const query = req.query
            // const slug = req.params

            console.log(query)
            // console.log(slug)

            // 2 params
            // 2 kinds of param:
            // param query (query search) (param search)
            // (param) path, slug :userId

            //page,limit(=pageSize)
            const startPo = (query.page - 1) * query.limit //skip
            const endPo = startPo + query.limit
            // 1: 0>10 (skip:0)
            // 2: 10>20 (skip:10)
            // 3: 20>30 (skip:20)
            // const listUser = await UsersModel.find({}).skip(startPo).limit(query.limit)
            // const listUser = await UsersModel.find({}).limit(query.limit).skip(startPo)
            // a
            const regex = new RegExp(query.searchValue, 'gi');
            const listUser = await UsersModel.find({
                $and: [
                    {
                        email: regex
                    }
                ]
            }).sort({
                email: 1
            })


            return res.status(200).send(listUser)
        } catch (err) {
            res.status(err.status || 500).send({
                err: err.message
            })
        }
    },

    // [DELETE] /delete-user/:email
    deleteUser: async (req, res) => {
        try {
            const { email } = req.params
            const inSectionUser = req.user
            console.log(inSectionUser)
            if (inSectionUser.isAdmin) {
                const user = await UsersModel.findOneAndDelete({
                    email
                })

                if (!user) throw {
                    message: "User not found",
                    status: 404
                }
            } else {
                const user = await UsersModel.findOneAndUpdate({
                    $and: [
                        {
                            email
                        }, {
                            email: inSectionUser.email
                        }
                    ]
                }, {
                    isActive: 'daan'
                })

                if (!user) throw {
                    message: "User not found",
                    status: 404
                }
            }

            res.status(200).send({
                message: "Delete success"
            })
        } catch (err) {
            res.status(err.status || 500).send({
                err: err.message
            })
        }
    }
}

export default userController