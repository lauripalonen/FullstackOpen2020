import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeBlog, likeBlog } from '../reducers/blogReducer'

import { sendError, sendNotification, clearNotification } from '../reducers/notificationReducer'
import { useParams, useHistory } from 'react-router-dom'

import blogService from '../services/blogs'
import CommentSection from './CommentSection'

const Blog = ({ loggedUser }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const id = useParams().id

  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(b => b.id === id)

  if (!blog) {
    return null
  }

  const handleRemoveBlog = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      const blogTitle = blog.title
      dispatch(removeBlog(blog))
      dispatch(sendNotification(`${blogTitle} removed`))
      dispatch(clearNotification(5000))
      history.push('/')
    }
  }

  const handleLike = (blog, event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  const handleComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    if (!comment) {
      dispatch(sendError('comment cannot be empty'))
      dispatch(clearNotification(5000))
      return
    }
    blogService.addComment(id, comment)
    event.target.comment.value = ''

  }

  return (
    <div className='blog-item'>
      <h2>{blog.title} {blog.author}</h2>
      <a href={`//${blog.url}`}>{blog.url}</a> <br />
      {blog.likes} likes <button id='like-button' onClick={(e) => handleLike(blog, e)}>like</button><br />
      added by {loggedUser.username} <br />
      {blog.user.username === loggedUser.username ? <button id='remove-blog-button' onClick={handleRemoveBlog}>remove</button> : null}
      <CommentSection blog={blog} handleComment={handleComment} />
    </div>
  )
}

export default Blog
