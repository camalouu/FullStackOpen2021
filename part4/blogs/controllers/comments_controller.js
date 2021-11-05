const commentRouter = require('express').Router()
const Comment = require('../models/Comment')

commentRouter.get('/', async (request, response, next) => {
    try {
        const id = request.baseUrl.split('/')[3]
        const comments = await Comment.find({ blogId: id })
        response.json(comments)
    } catch (err) {
        next(err)
    }
})

commentRouter.post('/', async (request, response, next) => {
    try {
        const { body } = request
        const id = request.baseUrl.split('/')[3]
        const result = new Comment({ ...body, blogId: id })
        await result.save()
        response.json(result)
    } catch (err) {
        next(err)
    }
})


commentRouter.delete('/', async (request, response, next) => {
    try {
        await Comment.deleteMany({})
        response.status(204).end()
    } catch (err) {
        next(err)
    }
})


module.exports = commentRouter