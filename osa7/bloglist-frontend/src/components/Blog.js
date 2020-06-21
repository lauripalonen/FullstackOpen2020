import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeBlog, likeBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch()
  const id = useParams().id

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)

  const blog = blogs.find(b => b.id === id)

  if (!blog) {
    return null
  }


  const handleRemoveBlog = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      dispatch(removeBlog(blog))
    }
  }

  const handleLike = (blog, event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  const commentSection = (
    <div>
      <h3>Comments</h3>
      <ul>
        {blog.comments.map(c => <li key={c}>{c}</li>)}
      </ul>
    </div>
  )

  return (
    <div className='blog-item'>
      <h2>{blog.title} {blog.author}</h2>
      {blog.url} <br />
      {blog.likes} likes <button id='like-button' onClick={(e) => handleLike(blog, e)}>like</button><br />
      added by {user.username} <br />
      {blog.user.username === user.username ? <button id='remove-blog-button' onClick={handleRemoveBlog}>remove</button> : null}
      {commentSection}
    </div>
  )
}

export default Blog
