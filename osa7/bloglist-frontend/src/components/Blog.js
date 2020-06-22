import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeBlog, likeBlog } from '../reducers/blogReducer'
import { sendError, clearNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'

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



  const handleComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    // dispatch(userLogin(username, password))
    if (!comment) {
      dispatch(sendError('comment cannot be empty'))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)

      return
    }
    blogService.addComment(id, comment)
    event.target.comment.value = ''

  }

  const commentField = (
    <form onSubmit={handleComment}>
      <input type="text"
        id='comment'
        name="Comment"
      />
      <button type='submit'>comment</button>
    </form>
  )



  const commentSection = (
    <div>
      <h3>Comments</h3>
      {commentField}
      <ul>
        {blog.comments.map(c => {
          if (c === null) { return }
          return (<li key={c}>{c}</li>)
        })}
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
