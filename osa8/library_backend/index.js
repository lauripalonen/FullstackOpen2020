require('dotenv').config()

const { ApolloServer, gql } = require('apollo-server')
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
    author: Author
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int!
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
    // bookCount: (root) => {books.filter(b => b.author === root.name).length}
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
    allAuthors: async () => {
      const result = await Author.find({})
      return Author.find({})
    }
  },

  Mutation: {
    addBook: (root, args) => {
      console.log('adding new book...')
      console.log('got arguments: ', args)
      const book = new Book({ ...args })
      console.log('created new book: ', book)
      return book.save()

      // const book = { ...args, id: uuid() }

      // if (!books.find(b => b.author === args.author)) {
      //   const author = { name: args.author, id: uuid(), born: null }
      //   authors = authors.concat(author)
      // }

      // books = books.concat(book)
      // return book
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      return author.save()
      // const author = authors.find(a => a.name === args.name)
      // if (!author) {
      //   return null
      // }
      // author.born = args.setBornTo
      // return author
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