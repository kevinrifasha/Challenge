const { comparePassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');
const {User} = require('../models');

class Controller {
    static async handleRegister(req, res, next) {
        try {
            const {username, email, password, phoneNumber, address} = req.body

            const user = await User.create({username, email, password, phoneNumber, address})

            res.status(201).json({
                id: user.id,
                email: user.email
            })
        } catch (error) {
            next(error)
        }
    }

    static async handleLogin(req, res, next) {
        try {
            const {email, password} = req.body

            if (!email) {
                throw {name: "BadRequest", message: "Email cannot be empty"}
            }

            if (!password) {
                throw {name: "BadRequest", message: "Password cannot be empty"}
            }

            const user = await User.findOne({
                where: {
                    email: email
                }
            })

            if (!user) {
                throw {name: "BadRequest", message: "Email or password is wrong"}
            }

            const isPassword = comparePassword(password, user.password)

            if (isPassword) {
                const access_token = createToken({
                    id: user.id,
                    email: user.email,
                    role: user.role
                })

                res.status(200).json({access_token})
            } else {
                throw {name: "BadRequest", message: "Email or password is wrong"}
            }

        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller