const blogRouter = require('express').Router()
const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const Blog = require('../models/Blog')
const User = require('../models/User')

blogRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog
            .find({}).populate('user', { username: 1, name: 1 })
        response.json(blogs)
    } catch (err) {
        next(err)
    }
})


blogRouter.get('/:id', async (request, response, next) => {
    try {
        const blogs = await Blog.findById(request.params.id)
        response.json(blogs)
    } catch (err) {
        next(err)
    }
})

blogRouter.post('/', async (request, response, next) => {
    try {
        const { body } = request
        console.log(request.token) // logs the token
        const decodedToken = jwt.verify(request.token, config.SECRET) // throws error 'token is not defined'

        if (!(token && decodedToken.id)) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({ ...body, user: user._id })

        const result = await blog.save()

        user.blogs = user.blogs.concat(result._id)

        await user.save()

        response.status(201).json(result)

    } catch (err) {
        next(err)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }
    catch (err) {
        next(err)
    }
})

blogRouter.delete('/', async (request, response, next) => {
    try {
        await Blog.deleteMany({})
        response.status(204).end()
    }
    catch (err) {
        next(err)
    }
})

blogRouter.put('/:id', async (request, response, next) => {
    try {
        const result = await Blog.findByIdAndUpdate(request.params.id,
            { ...request.body },
            { new: true, runValidators: true }
        )
        if (result)
            response.status(200).json(result)
        else
            response.status(404).end()
    }
    catch (err) {
        next(err)
    }
})

module.exports = blogRouter
