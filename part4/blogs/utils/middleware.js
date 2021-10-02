const logger = require('./logger')
const jwt = require('jsonwebtoken')
const config = require('./config')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  next(error)
}


const userExtractor = (request, response, next) => {

  const getTokenFrom = request => {
    const auth = request.get('authorization')
    if (auth && auth.startsWith('bearer ')) {
      return auth.substring(7)
    }
    return null
  }

  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, config.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  } else {
    request.user = decodedToken
  }

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor
}