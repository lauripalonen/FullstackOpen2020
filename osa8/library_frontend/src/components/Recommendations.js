import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommendations = (props) => {

  const { loading, data, error } = useQuery(
    ALL_BOOKS,
    { variables: { genre: props.genre } })

  if (!props.show) {
    return null
  }

  if (!props.books) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <div>
        books in your favorite genre <strong>{props.genre}</strong>
      </div>
      <div>
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
            {data.allBooks.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Recommendations