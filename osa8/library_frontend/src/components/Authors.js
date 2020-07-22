
import React, { useState } from 'react'
import Select from 'react-select'

import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, SET_BIRTHYEAR, ALL_BOOKS } from '../queries'

const Authors = (props) => {
  const [born, setBorn] = useState('')

  const [selection, setSelection] = useState(null)

  const handleSelect = (selectedItem) => {
    setSelection(selectedItem)
  }

  const [setBirthyear] = useMutation(
    SET_BIRTHYEAR,
    { refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }] }
  )

  const result = useQuery(ALL_AUTHORS)

  if (result.error) {
    console.log(result.error)
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const authors = [
    ...result.data.allAuthors
  ]

  const options = authors.map(a => {
    return (
      {
        value: a.name,
        label: a.name
      }
    )
  })

  const submit = (event) => {
    event.preventDefault()
    setBirthyear({ variables: { name: selection.value, born } })

    setSelection(null)
    setBorn('')
  }

  const birthyearForm = (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <Select
            value={selection}
            onChange={handleSelect}
            options={options}
          />
        </div>
        <div>
          born
            <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {props.token ? birthyearForm : <div></div>}
      {/* <div>
        <h3>Set birthyear</h3>
        <form onSubmit={submit}>
          <div>
            <Select
              value={selection}
              onChange={handleSelect}
              options={options}
            />
          </div>
          <div>
            born
            <input
              value={born}
              onChange={({ target }) => setBorn(Number(target.value))}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div> */}
    </div>
  )
}

export default Authors
