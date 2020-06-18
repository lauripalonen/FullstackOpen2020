import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import UserList from './components/UserList'
import UserDisplay from './components/UserDisplay'
import NotificationBar from './components/NotificationBar'
import TopBar from './components/TopBar'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { checkLocalStorage } from './reducers/loginReducer'
import { getUsers } from './reducers/userReducer'

import {
  BrowserRouter as Router,
  Switch, Route, Redirect
} from 'react-router-dom'

const App = () => {
  const user = useSelector(state => state.login)
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
    <Router>
      <NotificationBar notification={notification} />
      <TopBar user={user} />
      {!user ? <LoginForm /> :
        <Switch>
          <Route path="/blogs">
            <BlogForm />
          </Route>
          <Route path="/users/:id">
            <UserDisplay users={users} />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/login">
            {user ? <Redirect to="/" /> : <LoginForm />}
          </Route>
          <Route path="/">
            <BlogForm />
          </Route>
        </Switch>
      }
    </Router>
  )
}

export default App