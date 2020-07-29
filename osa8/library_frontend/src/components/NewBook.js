import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook, { error: mutationError }] = useMutation(CREATE_BOOK,
    {
      refetchQueries: [
        { query: ALL_BOOKS },
        { query: ALL_AUTHORS },
        { query: ALL_BOOKS, variables: { genre: props.favoriteGenre } }
      ]
    }
  )

  const authors = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (!props.token) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    console.log(authors)

    const variables = { variables: { title, author, published, genres } }
    console.log('submitting with variables: ', variables)

    try {
      await createBook(variables)
    } catch (error) {
      console.log('encountered an error!', error)
    }

    console.log('submitted!')
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  if (mutationError) {
    console.log('mutatationError: ', mutationError)
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook