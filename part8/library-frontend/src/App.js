import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED, ME } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const { loading: userLoading, data: userData } = useQuery(ME)
  const client = useApolloClient()

  useEffect(() => {
    const tokenFromLocal = window.localStorage.getItem('user')
    setToken(tokenFromLocal)
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      alert(`${addedBook.title} added!`)
      console.log(addedBook)
    }
  })

  if (userLoading) return null

  const logout = () => {
    //window.location.reload()
    window.localStorage.removeItem('user')
    client.resetStore()
    setToken(null)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        {
          token ?
            <button onClick={logout}>log out</button> :
            <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommend
        user={userData.me}
        show={page === 'recommend'}
      />

      <Login
        setToken={setToken}
        show={page === 'login'}
      />

    </div>
  )
}

export default App