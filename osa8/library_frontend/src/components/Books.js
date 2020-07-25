import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [filter, setFilter] = useState(null)

  const result = useQuery(ALL_BOOKS)

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

  const books = result.data.allBooks
  let genres = []

  books.forEach(b => {
    b.genres.forEach(g => {
      if (!genres.includes(g)) {
        genres = genres.concat(g)
      }
    })
  })

  const booksToShow = () => {
    if (filter) {
      return (
        books.filter(b => b.genres.includes(filter))
      )
    }

    return books

  }


  const GenreButtons = () => {
    return (
      <div>
        {genres.map(g => <button key={g} onClick={() => setFilter(g)}>{g}</button>)}
        <button onClick={() => setFilter(null)}>all</button>
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
          {booksToShow().map(a =>
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