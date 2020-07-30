import { gql } from '@apollo/client'

const AUTHOR_DETAILS = gql`
fragment AuthorDetails on Author {
  name
  born
  bookCount
}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String){
    allBooks(
      author: $author
      genre: $genre
    ) {
      title
      published
      genres
      author {
        name
      }
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      published
      genres
    }
  }
`

export const SET_BIRTHYEAR = gql`
  mutation setBirthyear($name: String!, $born: Int!){
    editAuthor(
      name: $name
      setBornTo: $born
    ) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
      favoriteGenre
    }
  }
`

