const User = require('../models/User')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const api = supertest(app)

const users = [
    {
        name: "zafar",
        username: "camalouu",
        password: "jjfr232OOkd"
    },
    {
        name: "ganiboy",
        username: "ganiBoy667",
        password: "23fsf"
    },
    {
        name: "ivanushka",
        username: "23r23r",
        password: "jjfr232OOkd"
    },
    {
        name: "ricardo",
        username: "asdfxzcvq",
        password: "234asdvaew32"
    },
    {
        name: "truman",
        username: "333ffhh4fv",
        password: "jojoba11"
    },
    {
        name: "americano",
        username: "upsetbitch",
        password: "11122kkosd"
    },
]

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(users)
})

describe('creating user', () => {
    test('invalid user is not created', async () => {
        const invalidUser = {
            username: "user010101",
            name: "nacho",
            password: "1"
        }

        const response = await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)

        expect(response.body.error)
            .toBe('password length must be longer than 3 characters')

        const { body } = await api.get('/api/users')

        expect(body).toHaveLength(users.length)

        const usernamesFromDb = body.map(e => e.username)

        expect(usernamesFromDb).not.toContain(invalidUser.username)

    })
})

afterAll(() => {
    mongoose.connection.close()
})