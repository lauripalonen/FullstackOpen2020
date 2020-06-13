import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import NotificationBar from './components/NotificationBar'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { checkLocalStorage } from './reducers/userReducer'

const App = () => {
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(checkLocalStorage())
  }, [dispatch])

  return (
    <div>
      <NotificationBar notification={notification} />

      {user === null ?
        <LoginForm/> :
        <BlogForm
          user={user}
        />}
    </div>
  )
}

export default App