import React from 'react'

const Recommendations = (props) => {

  if (!props.show) {
    return null
  }

  if (!props.books) {
    return null
  }

  console.log(props.books)

  const booksToShow = props.books.filter(b =>
    b.genres.includes(props.genre)
  )

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
            {booksToShow.map(a =>
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