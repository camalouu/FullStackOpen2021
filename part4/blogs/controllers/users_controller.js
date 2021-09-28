const userRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

userRouter.post('/', async (request, response, next) => {
    try {
        const { password, name, username } = request.body

        if (!(password && username)) {
            return response.status(400).send({ error: 'password and username required' })
        }

        if (password.length < 3) {
            return response.status(400).send({ error: 'password length must be longer than 3 characters' })
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({ passwordHash, name, username })

        await newUser.save()
        response.status(201).send(newUser)

    } catch (err) {
        next(err)
    }
})

userRouter.get('/', async (request, response, next) => {
    try {
        const result = await User.find({}).populate('blogs', { title: 1, author: 1 })
        response.status(200).json(result)
    } catch (err) {
        next(err)
    }
})

userRouter.get('/:id', async (request, response, next) => {
    try {
        const result = await User.findById(request.params.id)
        response.status(200).json(result.password)
    } catch (err) {
        next(err)
    }
})

userRouter.delete('/', async (request, response, next) => {
    try {
        await User.deleteMany({})
        response.status(200).end()
    } catch (err) { next(err) }
})
module.exports = userRouter