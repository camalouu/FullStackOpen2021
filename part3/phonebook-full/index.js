const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', req => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let data = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(data)
})

app.get('/info', (req, res) => {
    res.send(`Phonebook has info for ${data.length} people <br> ${new Date()}`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = data.find(p => p.id == id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
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

    if (data.find(p => p.name === name))
        return res.status(400).send({ error: 'already existing name' })

    const newPerson = {
        id: Math.floor(Math.random() * 1000),
        name: name,
        number: number
    }
    data.push(newPerson)
    res.send(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`App is working on ${PORT}`))