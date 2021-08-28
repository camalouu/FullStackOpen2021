require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/Person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', req => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res) => {
    Person.find({}).then(result => res.json(result))
})

app.get('/info', (req, res) => {
    Person.countDocuments().then(number => {
        res.send(`Phonebook has info for ${number} people <br> ${new Date()}`)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person)
                res.json(person)
            else
                res.status(404).end()
        })
        .catch(error => next(error))
})


app.delete('/api/persons/:id', (req, res, next) => {

    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            console.log(result)
            res.status(204).end()
        })
        .catch(error => next(error))
})


app.post('/api/persons', (req, res) => {
    const name = req.body.name
    const number = req.body.number

    if (!(name && number))
        return res.status(400).send({ error: 'name and number are required' })

    const newPerson = new Person({
        name: name,
        number: number
    })

    newPerson.save().then(_ => res.send(newPerson))
})

app.put('/api/persons/:id', (req, res, next) => {
    const person = {
        name: req.body.name,
        number: req.body.number
    }
    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(result => {
            if (result)
                res.json(result)
            else
                res.status(404).end();
        })
        .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}
app.use(errorHandler)

const unknownEndpoint = (req, res) =>
    res.status(404).send({ error: 'unknown endpoint' })
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`App is working on ${PORT}`))