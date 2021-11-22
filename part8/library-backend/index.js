const { ApolloServer, gql, UserInputError } = require('apollo-server')

const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')

mongoose
    .connect('mongodb://localhost:27017/library')
    .then(_ => console.log('connected to db'))
    .catch(err => console.error(err))

const typeDefs = gql`
    type Author {
        name: String!
        id: ID!
        born: Int,
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
  }

  type Mutation {
    addBook(
        title: String!
        published: Int!
        author: String!
        genres: [String!]!):Book!

    editAuthor(name: String!, born: Int! ): Author
  }
`

const resolvers = {
    Query: {
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
        addBook: async (root, args) => {
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
        editAuthor: async (root, args) => {
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
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})