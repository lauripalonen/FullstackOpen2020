import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import CreateNewForm from './CreateNewForm'
import { likeBlog } from '../reducers/blogReducer'
import { userLogout } from '../reducers/userReducer'
import { clearNotification } from '../reducers/notificationReducer'

const BlogForm = ({ user }) => {

  const blogs = useSelector(state => state.blogs)

  const dispatch = useDispatch()

  const handleLike = async (blog, event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(userLogout())
    dispatch(clearNotification())
  }

  return (
    <div>
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
          handleLike={handleLike}
        />)}
      </div>
    </div>
  )
}

export default BlogForm