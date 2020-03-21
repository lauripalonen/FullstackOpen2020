import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import NotificationBar from './components/NotificationBar'
// import { findAllByPlaceholderText } from '@testing-library/react'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification(null)

    } catch (exception) {
      setNotification({ type: 'error', msg: 'wrong username or password' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }

  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    setNotification(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  return (
    <div>
      <NotificationBar notification={notification} />

      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        /> :
        <BlogForm
          user={user}
          handleLogout={handleLogout}
        />}
    </div>
  )
}

export default App