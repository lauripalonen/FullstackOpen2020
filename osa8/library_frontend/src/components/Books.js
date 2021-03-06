import React from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [filteredBooks, { loading, data }] = useLazyQuery(ALL_BOOKS)

  const result = useQuery(ALL_BOOKS)

  if (result.error) {
    console.log('error: ', result.error)
    return
  }

  if (result.loading) {
    return <div>
      <h2>books</h2>
      loading...
      </div>
  }

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>
      <h2>books</h2>
    loading...
    </div>
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
    if (data) {
      return (
        data.allBooks
      )
    }

    return books

  }


  const GenreButtons = () => {
    return (
      <div>
        {genres.map(g => <button
          key={g}
          onClick={() => filteredBooks({ variables: { genre: g } })}>{g}</button>)}
        <button onClick={() => filteredBooks({ variables: {} })}>all</button>
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