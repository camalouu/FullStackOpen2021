const Blog = require('../models/Blog')
const User = require('../models/User')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const api = supertest(app)

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(blogs)
    await User.deleteMany({})
}, 100000)


const newUserSignsIn = async () => {

    const newUser = {
        username: "nacho123",
        password: "IHateHector",
        name: "Ignacio Varga"
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-type', /application\/json/)


    const token = (
        await api
            .post('/api/login')
            .send({ ...newUser })
            .expect(200)
            .expect('Content-type', /application\/json/)
    ).body.token

    return token
}

describe('getting', () => {

    test('get all', async () => {

        await api.get('/api/blogs')
            .expect(200)
            .expect('Content-type', /application\/json/)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(blogs.length)
    })

    test('has id', async () => {
        await api.get('/api/blogs')
            .expect(200)
            .expect('Content-type', /application\/json/)

        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })

})

describe('creating', () => {

    test('adding a new valid blog', async () => {

        const newBlog = {
            title: "Why nations fail",
            author: "dunno",
            url: "ex.com",
            likes: 34
        }

        const token = await newUserSignsIn()

        await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(blogs.length + 1)

        const respArr = response.body.map(el => el.title)

        expect(respArr).toContain("Why nations fail")

    })

    test('adding a blog without token', async () => {
        const newBlog = {
            title: "Why nations fail",
            author: "dunno",
            url: "ex.com",
            likes: 34
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })

    test("likes missing", async () => {

        const newBlog = {
            title: "SomeTitle",
            author: "James McGill",
            url: "ex.com",
        }

        const token = await newUserSignsIn()

        const response = await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBe(0)

    })

    test("title and url missing", async () => {

        const newBlog = {
            author: "dunno",
        }

        const token = await newUserSignsIn()

        await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

    })

})

describe('deleting', () => {

    test('blog deleted', async () => {

        const newBlog = {
            title: "Why nations fail",
            author: "dunno",
            url: "ex.com",
            likes: 34
        }

        const token = await newUserSignsIn()

        const newBlogCreated = await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const id = newBlogCreated.body.id

        await api
            .delete(`/api/blogs/${id}`)
            .set('Authorization', 'bearer ' + token)
            .expect(204)

        const { body } = await api.get('/api/blogs')

        expect(body).toHaveLength(blogs.length)

        const ids = body.map(e => e.id)

        expect(ids).not.toContain(id)

    })
})

describe('updating', () => {

    test('updating nonexisting blog', async () => {
        const fakeId = '5a422a851b54a676234d17f1'

        const newObject = {
            author: 'Joshua',
            url: 'example.com',
        }

        await api
            .put(`/api/blogs/${fakeId}`)
            .send(newObject)
            .expect(404)

    })


    test('updating a valid blog', async () => {
        const id = '5a422aa71b54a676234d17f8' // second obj in blogs

        await api.put(`/api/blogs/${id}`)
            .send({ likes: 12 })
            .expect(200)

        const { body } = await api.get('/api/blogs')

        const newTitle = body.find(e => e.id === id).likes
        const oldTitle = blogs.find((e => e._id === id)).likes

        expect(newTitle).not.toBe(oldTitle)

    })
})

afterAll(() => {
    mongoose.connection.close()
})