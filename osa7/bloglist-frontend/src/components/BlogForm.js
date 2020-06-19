import React from 'react'
import { useSelector } from 'react-redux'
import CreateNewForm from './CreateNewForm'
import { Link } from 'react-router-dom'

const BlogForm = ({ user }) => {

  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <h2>blog app</h2>
      <CreateNewForm user={user} />
      <div id="blog-list">
        {blogs.map(blog => <div key={blog.id} className='blog-item'><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></div>)}
      </div>
    </div>
  )
}

export default BlogForm