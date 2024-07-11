const { verifyToken } = require("../helpers/jwt")
const {User} = require('../models');


async function authentications(req, res, next) {
    try {
        const {access_token} = req.headers

        if (!access_token) {
            throw {name: "Unauthenticated", message: "authentication failed"}
        }

        const payload = verifyToken(access_token)

        const user = await User.findOne({
            where: {
                email: payload.email
            }
        })

        if (user) {
            req.user = {
                id: user.id,
                email: user.email,
                role: user.role
            }
            next()
        } else {
            throw {name: "Unauthenticated", message: "authentication failed"}
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authentications