import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [books, setBooks] = useState(null)

  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (result.data) {
      const books = result.data.allBooks
      console.log('effect: ', books)
      setBooks(books)
    }
  }, [result])

  if (result.error) {
    console.log('error: ', result.error)
    return
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const genres = (books) => {
    let genres = []
    books.forEach(b => b.genres.forEach(g => {
      if (!genres.includes(g)) {
        genres = genres.concat(g)
      }
    }))

    return genres
  }

  const filterByGenre = (genre) => {
    const filteredBooks = books.filter(b => b.genres.includes(genre))
    setBooks(filteredBooks)
  }

  const GenreButtons = ({ books }) => {
    console.log('genrebuttons books: ', books)
    const genreArray = genres(books)
    console.log(genreArray)

    return (
      <div>
        {genreArray.map(g => <button key={g} onClick={() => filterByGenre(g)}>{g}</button>)}
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <GenreButtons books={books} />
    </div>
  )
}

export default Books