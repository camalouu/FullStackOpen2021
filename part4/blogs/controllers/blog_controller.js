const blogRouter = require('express').Router()
const Blog = require('../models/Blog')

blogRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    } catch (err) {
        next(err)
    }
})


blogRouter.get('/:id', async (request, response) => {
    try {
        const blogs = await Blog.findById(request.params.id)
        response.json(blogs)
    } catch (err) {
        next(err)
    }
})

blogRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
    try {
        const result = await blog.save()
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