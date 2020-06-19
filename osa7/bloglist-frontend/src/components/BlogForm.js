import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import CreateNewForm from './CreateNewForm'
import { likeBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const BlogForm = ({ user }) => {

  const blogs = useSelector(state => state.blogs)

  const dispatch = useDispatch()

  const handleLike = async (blog, event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  return (
    <div>
      <h2>blogs</h2>
      <CreateNewForm user={user} />
      <div id="blog-list">
        {blogs.map(blog => <div key={blog.id} className='blog-item'><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>)}
      </div>
      {/* <div id="blog-list">
        {blogs.map(blog => <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleLike={handleLike}
        />)}
      </div> */}
    </div>
  )
}

export default BlogForm