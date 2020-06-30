import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoginForm from './components/LoginForm'
import BlogsDisplay from './components/BlogsDisplay'
import UserList from './components/UserList'
import UserDisplay from './components/UserDisplay'
import NotificationBar from './components/NotificationBar'
import Blog from './components/Blog'
import NavBar from './components/NavBar'

import { initializeBlogs } from './reducers/blogReducer'
import { checkLocalStorage } from './reducers/loginReducer'
import { getUsers } from './reducers/userReducer'

import { Container } from '@material-ui/core'

import {
  BrowserRouter as Router,
  Switch, Route, Redirect
} from 'react-router-dom'

const App = () => {
  const loggedUser = useSelector(state => state.login)
  const notification = useSelector(state => state.notification)
  const users = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(checkLocalStorage())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <Container>
      <Router>
        <NavBar loggedUser={loggedUser} />
        <h1>Blog app</h1>
        <NotificationBar notification={notification} />
        {!loggedUser ? <LoginForm /> :
          <Switch>
            <Route path="/blogs/:id">
              <Blog loggedUser={loggedUser} />
            </Route>
            <Route path="/blogs">
              <BlogsDisplay loggedUser={loggedUser} />
            </Route>
            <Route path="/users/:id">
              <UserDisplay users={users} />
            </Route>
            <Route path="/users">
              <UserList />
            </Route>
            <Route path="/login">
              {loggedUser ? <Redirect to="/" /> : <LoginForm />}
            </Route>
            <Route path="/">
              <BlogsDisplay loggedUser={loggedUser} />
            </Route>
          </Switch>
        }
      </Router>
    </Container>
  )
}

export default App