require('dotenv').config()

const { ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
  PubSub } = require('apollo-server')
const pubsub = new PubSub()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const book = require('./models/book')
const author = require('./models/author')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

console.log('connecting to MONGODB')

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB!')
  })
  .catch((error) => {
    console.log('error while connecting to MongoDB: ', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
    favoriteGenre: String!
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
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    resetDatabase: String
  }
  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {

  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books = await Book.find({}).populate('author')

      if (args.genre) {
        books = books.filter(b => b.genres.includes(args.genre))
      }

      if (args.author) {
        books = books.filter(b => b.author.name === args.author)
      }

      return books
    },

    allAuthors: async () => {
      return await Author.find({})
    },

    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Mutation: {
    resetDatabase: async () => {
      Book.collection.deleteMany({}, (err, result) => {
        if (err) {
          console.log('encountered error: ', err)
        }
      })

      Author.collection.deleteMany({}, (err, result) => {
        if (err) {
          console.log('encountered error: ', err)
        }
      })


      let author01 = new Author({
        name: "Carlo Rovelli",
        born: 1956,
        bookCount: 1
      })

      let author02 = new Author({
        name: "J.D. Salinger",
        born: 1919,
        bookCount: 1
      })

      try {
        author01 = await author01.save()
        author02 = await author02.save()
      } catch (error) {
        console.log('encountered an error: ', error)
      }

      let book01 = new Book({
        title: "The Order of Time",
        published: 2017,
        author: author01,
        genres: ["science", "time", "quantum physics"]
      })

      let book02 = new Book({
        title: "The Catcher in the Rye",
        published: 1961,
        author: author02,
        genres: ["coming-of-age", "fiction"]
      })

      try {
        book01 = await book01.save()
        book02 = await book02.save()
      } catch (error) {
        console.log('encountered an error: ', error)
      }
      return 'database initialized'

    },

    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author, bookCount: 0 })

        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      let book = new Book({ ...args, author: author })

      try {
        book = await book.save()
        author.bookCount = author.bookCount + 1
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },

    createUser: (root, args) => {
      const user = new User({ username: args.username })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      const returnValue = {
        value: jwt.sign(userForToken, JWT_SECRET),
        favoriteGenre: user.favoriteGenre
      }

      return returnValue
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }

      author.born = args.setBornTo
      return author.save()
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)

      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})