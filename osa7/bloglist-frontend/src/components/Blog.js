import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user, handleLike }) => {
  const [simpleDisplay, setSimpleDisplay] = useState(true)

  const buttonText = () => (simpleDisplay ? 'view' : 'hide')

  const dispatch = useDispatch()

  const handleButtonClick = async (event) => {
    event.preventDefault()
    setSimpleDisplay(!simpleDisplay)
  }

  const handleRemoveBlog = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      dispatch(removeBlog(blog))
    }
  }

  const detailedDisplay = () => (
    <div>
      {blog.url} <br />
      likes: {blog.likes} <button id='like-button' onClick={(e) => handleLike(blog, e)}>like</button><br />
      {blog.user.username} <br />
      {blog.user.username === user.username ? <button id='remove-blog-button' onClick={handleRemoveBlog}>remove</button> : null}
    </div>
  )

  return (
    <div className='blog-item'>
      {blog.title} {blog.author} <button id="display-toggle-button" onClick={handleButtonClick}>{buttonText()}</button>
      {simpleDisplay ? null : detailedDisplay()}
    </div>
  )
}

export default Blog
