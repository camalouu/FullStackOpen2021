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

const getToken = request => {
    const auth = request.get('authorization')
    if (auth && auth.startsWith('bearer ')) {
        return auth.substring(7)
    }
    return null
}

blogRouter.post('/', async (request, response, next) => {
    try {
        const { body } = request
        const token = getToken(request)
        const decodedToken = jwt.verify(token, config.SECRET)

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