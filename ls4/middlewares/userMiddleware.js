import UsersModel from "../models/users.js"

export const userMiddleware = {
    isValidAdmin: async (req, res, next) => {
        try {
            const user = await UsersModel.findOne({
                email: req.body.email,
            })

            const isAdmin = user.isAdmin
            console.log(user)

            if (!isAdmin) throw {
                status: 403,
                message: "Forbidden"
            }

            next()
        } catch (err) {
            res.status(err.status).send({
                err: err.message
            })
        }
    }
}