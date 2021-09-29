const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const config = require('../utils/config')

loginRouter.route('/')
    .get((req, res) => {
        res.send({ name: "alrite" })
    })

loginRouter.post('/', async (request, response, next) => {
    try {

        const { body } = request;

        const user = await User.findOne({ username: body.username })

        const passwordCorrect = user ? await bcrypt.compare(body.password, user.passwordHash) : false

        if (!(user && passwordCorrect)) {
            return response.status(401).json({
                error: "invalid username or password"
            })
        }

        const token = jwt.sign({
            username: user.username,
            id: user._id
        }, config.SECRET)

        response.status(200).json({ token, username: user.username, name: user.name })

    } catch (err) {
        next(err)
    }
})

module.exports = loginRouter