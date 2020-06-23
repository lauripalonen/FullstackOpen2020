import React from 'react'
import { useSelector } from 'react-redux'
import CreateNewForm from './CreateNewForm'
import { Link } from 'react-router-dom'

const BlogsDisplay = ({ loggedUser }) => {

  const blogs = useSelector(state => state.blogs)

  const BlogItem = ({ blog }) => {
    return (
      <div key={blog.id} className='blog-item'>
        <Link to={`/blogs/${blog.id}`}>{blog.title} | {blog.author}</Link>
      </div>
    )
  }

  const BlogList = ({ blogs }) => {
    return (
      <div id='blog-list'>
        {blogs.map(blog => <BlogItem key={blog.id} blog={blog} />)}
      </div>
    )
  }

  return (
    <div>
      <h2>blog app</h2>
      <CreateNewForm user={loggedUser} />
      <BlogList blogs={blogs} />
    </div>
  )
}

export default BlogsDisplay