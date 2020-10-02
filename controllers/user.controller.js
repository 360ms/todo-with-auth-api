const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const jwt_decode = require('jwt-decode')
const User = require('../mongodb/models/User')

const validateRegisterInput = require('../validation/user/register.validation')
const validateLoginInput = require('../validation/user/login.validation')
const { response } = require('express')

register = async (req, res) => {
    const body = req.body
    const { email } = body
    const { errors, isValid } = validateRegisterInput(body)

    if (!isValid) {
        return res.status(400).json({
            success: false,
            msg: errors
        })
    }

    await User.findOne({ email }).then(user => {
        if (user) {
            return res.status(400).json({
                success: false,
                msg: `${email} already exist!`
            })
        } else {
            const newUser = new User(body)

            bcryptjs.genSalt(10, (errors, salt) => {
                bcryptjs.hash(newUser.password, salt, (errors, hash) => {
                    if (errors) throw error

                    newUser.password = hash

                    newUser
                        .save()
                        .then(user => res.json({ success: true, data: user }))
                        .catch(error => res.json({ success: false, msg: error.message }))
                })
            })
        }
    }).catch(error => res.status(400).json({ success: false, msg: error.message }))
}

login = async (req, res) => {
    const body = req.body
    const { email, password } = body
    const { errors, isValid } = validateLoginInput(body)

    if (!isValid) {
        return res.status(400).json({
            success: false,
            msg: errors
        })
    }

    await User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: '🔍 User not found'
            })
        }

        bcryptjs.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name
                }

                jwt.sign(
                    payload,
                    keys.secret,
                    { expiresIn: 900 },
                    (error, token) => {
                        if (error) {
                            return res.status(400).json({
                                success: false,
                                msg: error
                            })
                        }

                        return res.json({
                            success: true,
                            token: `Bearer ${token}`,
                            data: jwt_decode(token)
                        })
                    }
                )
            } else {
                return res.status(400).json({
                    success: false,
                    msg: 'Password incorrent!'
                })
            }
        })
    })
}

module.exports = {
    register,
    login
}