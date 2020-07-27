
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('add')}>add book</button> : null}
        {token ?
          <button onClick={() => setToken(null)}>logout</button> :
          <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
        token={token}
      />

      <NewBook
        show={page === 'add'}
        token={token}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

    </div>
  )
}

export default App