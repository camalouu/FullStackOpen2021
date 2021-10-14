const listHelper = require('../utils/list_helper')
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

describe('total likes', () => {

    test('total number of likes in blogs list', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })

    test('total number of likes in last 2 blog list', () => {
        const result = listHelper.totalLikes(blogs.slice(-2))
        expect(result).toBe(2)
    })

    test('total number of likes in 2nd and 3rd blogs in the list', () => {
        const result = listHelper.totalLikes(blogs.slice(1, 3))
        expect(result).toBe(17)
    })
})


describe('favorite blog', () => {

    test('most liked blog', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(blogs[2])
    })

})


describe('most blogs', () => {

    test('Blogger who has tons of free time', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual(
            {
                author: "Robert C. Martin",
                blogs: 3
            }
        )
    })

})

describe('most likes', () => {
    test('author with most likes', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual(
            {
                author: "Edsger W. Dijkstra",
                likes: 17
            }
        )
    })
})