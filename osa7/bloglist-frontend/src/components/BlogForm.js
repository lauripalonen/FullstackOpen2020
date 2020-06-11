import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import CreateNewForm from './CreateNewForm'
import NotificationBar from './NotificationBar'
import { likeBlog } from '../reducers/blogReducer'

const BlogForm = ({ user, handleLogout }) => {

  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)

  const dispatch = useDispatch()

  const handleLike = async (blog, event) => {
    event.preventDefault()
    console.log('(BlogForm) dispatch blog like with blog: ', blog)
    dispatch(likeBlog(blog))
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
          handleLike={handleLike}
        />)}
      </div>
    </div>
  )
}

export default BlogForm