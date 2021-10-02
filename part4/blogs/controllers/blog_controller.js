const blogRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const middleware = require('../utils/middleware')

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
        const blog = await Blog.findById(request.params.id)
        response.json(blog)
    } catch (err) {
        next(err)
    }
})

blogRouter.post('/', middleware.userExtractor, async (request, response, next) => {
    try {
        const { body } = request
        const user = await User.findById(request.user.id)
        const blog = new Blog({ ...body, user: user._id })
        const result = await blog.save()
        user.blogs = user.blogs.concat(result._id)
        await user.save()
        response.status(201).json(result)
    } catch (err) {
        next(err)
    }
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
    try {
        const blogId = request.params.id
        const blog = await Blog.findById(blogId)
        if (blog.user.toString() === request.user.id) {
            await Blog.findByIdAndDelete(blogId)
            return response.status(204).end()
        } else {
            return response.status(401).json({ error: "wrong user" })
        }
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
