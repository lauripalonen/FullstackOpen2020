import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import CreateNewForm from './CreateNewForm'
import NotificationBar from './NotificationBar'

const BlogForm = ({ user, handleLogout }) => {

  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)

  const dispatch = useDispatch()

  // const resetNotification = () => {
  //   setTimeout(() => {
  //     dispatch({ type: 'CLEAR_NOTIFICATION' })
  //   }, 5000)
  // }

  const likeBlog = async (blog, event) => {
    event.preventDefault()
    dispatch({ type: 'LIKE_BLOG', blog: blog })
  }

  return (
    <div>
      <NotificationBar notification={notification} />
      <h2>blogs</h2>
      <div>
        {user.name} logged in <button onClick={handleLogout}>log out</button>
      </div>
      <CreateNewForm user={user} />
      <div id="blog-list">
        {blogs.map(blog => <Blog
          key={blog.id}
          blog={blog}
          user={user}
          likeBlog={likeBlog}
        />)}
      </div>
    </div>
  )
}

export default BlogForm