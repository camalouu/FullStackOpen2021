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
    Person.count().then(number => {
        res.send(`Phonebook has info for ${number} people <br> ${new Date()}`)
    })
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(person => res.json(person))
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = data.find(p => p.id == id)
    if (person) {
        data = data.filter(p => p.id !== person.id)
        res.status(200).end()
    } else {
        res.status(404).end()
    }
})

app.post('/api/persons', (req, res) => {
    const name = req.body.name
    const number = req.body.number

    if (!name || !number)
        return res.status(400).send({ error: 'name and number are required' })

    const newPerson = new Person({
        name: name,
        number: number
    })

    newPerson.save().then(_ => res.send(newPerson))
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`App is working on ${PORT}`))