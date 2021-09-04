const blogRouter = require('express').Router()
const Blog = require('../models/Blog')

blogRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
        .catch(err=>next(err))
})

blogRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(err=>next(err))
})

blogRouter.delete('/:id', (request, response, next) => {
    console.log("request came");
    Blog.findByIdAndDelete(request.params.id)
        .then(res => {
            response.json(res)
        })
        .catch(err=>next(err))
})

module.exports = blogRouter