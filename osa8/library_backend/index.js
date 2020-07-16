require('dotenv').config()

const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to MONGODB')

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB!')
  })
  .catch((error) => {
    console.log('error while connecting to MongoDB: ', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({
        author: root.id
      })
      return books.length
    }
  },

  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({})

      return books
      // let result = [...books]

      // if (args.author) {
      //   result = result.filter(b => b.author === args.author)
      // }

      // if (args.genre) {
      //   result = result.filter(b => b.genres.includes(args.genre))
      // }

      // return result
    },
    allAuthors: () => {
      return Author.find({})
    }
  },

  Mutation: {
    addBook: async (root, args) => {
      console.log('args.author: ', args.author)
      let author = await Author.findOne({ name: args.author })
      console.log('Search result for author: ', author)

      if (!author) {
        author = new Author({ name: args.author })
        console.log('Author not found, created new: ', author)

        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      const book = new Book({ ...args, author: author })
      console.log('created new book: ', book)

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return book
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }

      author.born = args.setBornTo
      return author.save()
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