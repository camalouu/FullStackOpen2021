const blogRouter = require('express').Router()
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
        const users = await User.find({})
        const blog = new Blog({ ...request.body, user: users[0]._id })
        const result = await blog.save()
        users[0].blogs = users[0].blogs.concat(result._id)
        await users[0].save()
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