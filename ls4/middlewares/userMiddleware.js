import UsersModel from "../models/users.js"
import { decodeToken } from "../utils/jwt.js"

export const userMiddleware = {
    isAuthenticated: async (req, res, next) => {
        try {

            const authorizationData = req.headers['authorization']
            // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzIwZjE2ZTk0NDQyYmVkYTZjZGU5MzIiLCJpYXQiOjE3MzA1NTY2OTMsImV4cCI6MTczMDU2MDI5M30.kjjgI3qomhvDimlBVN8LdUDDyFIjkmI59pS1EP_Iu0k
            if (!authorizationData) throw {
                status: 401,
                message: "Unauthenticated"
            }
            const accessToken = authorizationData.split(' ')[1]
            if (!accessToken) throw {
                status: 401,
                message: "Unauthenticated"
            }
            const userData = decodeToken(accessToken)
            const user = await UsersModel.findById(userData.userId)

            if (!user) throw {
                status: 401,
                message: "Unauthenticated"
            }


            req.user = user

            next()
        }
        catch (err) {
            res.status(err.status || 500).send({
                err: err.message
            })
        }

    },
    isValidAdmin: async (req, res, next) => {
        try {
            const user = req.user
            if (!user.isAdmin) throw {
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