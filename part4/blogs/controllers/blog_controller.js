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

blogRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
    try {
        const result = await blog.save()
        response.status(201).json(result)
    } catch (err) {
        next(err)
    }
})

blogRouter.delete('/:id', (request, response, next) => {
    console.log("request came");
    Blog.findByIdAndDelete(request.params.id)
        .then(res => {
            response.json(res)
        })
        .catch(err => next(err))
})

module.exports = blogRouter