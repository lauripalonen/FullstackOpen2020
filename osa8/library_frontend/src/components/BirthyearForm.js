import React, { useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, SET_BIRTHYEAR } from '../queries'

const BirthyearForm = ({ authors }) => {
  const [selection, setSelection] = useState(null)
  const [born, setBorn] = useState('')

  const options = authors.map(a => {
    return (
      {
        value: a.name,
        label: a.name
      }
    )
  })

  const [setBirthyear] = useMutation(
    SET_BIRTHYEAR,
    { refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }] }
  )

  const submit = (event) => {
    event.preventDefault()
    setBirthyear({ variables: { name: selection.value, born } })

    setSelection(null)
    setBorn('')
  }

  const handleSelect = (selectedItem) => {
    setSelection(selectedItem)
  }

  return (
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
}

export default BirthyearForm