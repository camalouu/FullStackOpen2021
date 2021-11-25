const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const SECRET = 'secret'

mongoose
    .connect('mongodb://localhost:27017/library')
    .then(_ => console.log('connected to db'))
    .catch(err => console.error(err))

const typeDefs = gql`
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }
    
    type Token {
        value: String!
    }

    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!):Book!

        editAuthor(name: String!, born: Int! ): Author

        createUser(
            username: String!
            favoriteGenre: String!
        ): User

        login(
            username: String!
            password: String!
        ): Token
    }
`

const resolvers = {
    Query: {
        me: (root, args, { currentUser }) => currentUser,
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (!(args.author || args.genre)) {
                const books = await Book.find({})
                return books
                    .map(b => b.populate('author'))
            }

            if (args.genre && args.author) {
                const author = await Author.findOne({ name: args.author })
                if (!author) throw new UserInputError("author doesn't exist")
                return Book
                    .find({ author: author._id, genres: { $in: [args.genre] } })
                    .populate('author')
            }

            if (args.author) {
                const author = await Author.findOne({ name: args.author })
                if (!author) throw new UserInputError("author doesn't exist")
                const books = await Book.find({ author: author._id })
                return books.map(b => b.populate('author'))
            }

            if (args.genre)
                return await Book
                    .find({ genres: { $in: [args.genre] } })
                    .populate('author')
        },
        allAuthors: async () => await Author.find({})
    },
    Author: {
        bookCount: root => root.books.length
    },
    Mutation: {

        createUser: async (root, { username, favoriteGenre }) => {
            return User.create({ username, favoriteGenre })
        },
        login: async (root, { username, password }) => {
            const user = await User.findOne({ username })

            if (!user || password !== '1')
                throw new UserInputError("wrong username or password")

            return {
                value: jwt.sign({ id: user._id, username }, SECRET, { expiresIn: 60 * 60 * 60 })
            }
        },

        addBook: async (root, args, { currentUser }) => {
            if (!currentUser) throw new AuthenticationError("Not Authenticated")
            const author = await Author.findOne({ name: args.author })
            if (author) {
                const newbook = await Book.create({ ...args, author: author._id })
                author.books = author.books.concat(newbook._id)
                await author.save()
                return newbook.populate('author')
            }

            const newAuthor = await Author.create({ name: args.author })
            try {
                const newbook = await Book.create({ ...args, author: newAuthor._id })
                newAuthor.books = newAuthor.books.concat(newbook._id)
                await newAuthor.save()
                return newbook.populate('author')
            } catch (error) {
                await Author.findByIdAndDelete(newAuthor._id)
                throw new UserInputError(error.message)
            }
        },
        editAuthor: async (root, args, { currentUser }) => {
            if (!currentUser) throw new AuthenticationError("Not Authenticated")
            const updated = await Author.findOneAndUpdate(
                { name: args.name },
                { born: args.born },
                { new: true }
            )
            if (!updated)
                throw new UserInputError("incorrect name")
            return updated

        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            let decodedToken = null
            try {
                decodedToken = jwt.verify(auth.substring(7), SECRET)
            } catch (error) {
                throw new AuthenticationError(error.message)
            }
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})