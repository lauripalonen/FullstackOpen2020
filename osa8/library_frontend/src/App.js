
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const [page, setPage] = useState('authors')

  const result = useQuery(ALL_BOOKS)
  const client = useApolloClient()


  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      set.map(b => b.id).includes(object.id)
    }

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`New book has been added: ${addedBook.title}`)
      updateCacheWith(addedBook)
    }
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  if (result.error) {
    return <div>encountered an error while fetching books</div>
  }

  const books = result.data.allBooks

  const loggedUserFunctionalities = () => {
    return (
      <div style={{ display: 'inline' }}>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommendations</button>
        <button onClick={() => {
          setToken(null)
          setFavoriteGenre(null)
        }}>logout</button>
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? loggedUserFunctionalities() :
          <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
        token={token}
        favoriteGenre={favoriteGenre}
      />

      <NewBook
        show={page === 'add'}
        token={token}
        favoriteGenre={favoriteGenre}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
        setFavoriteGenre={setFavoriteGenre}
      />

      <Recommendations
        show={page === 'recommendations'}
        genre={favoriteGenre}
        books={books}
      />

    </div>
  )
}

export default App