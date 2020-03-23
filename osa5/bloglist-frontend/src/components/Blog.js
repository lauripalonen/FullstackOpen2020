import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, removeFromList, user, likeBlog }) => {
  const [simpleDisplay, setSimpleDisplay] = useState(true)

  const buttonText = () => (simpleDisplay ? 'view' : 'hide')

  const handleButtonClick = async (event) => {
    event.preventDefault()
    setSimpleDisplay(!simpleDisplay)
  }

  const removeBlog = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      await blogService.removeBlog(blog.id)
      removeFromList(blog)
    }
  }

  const detailedDisplay = () => (
    <div>
      {blog.url} <br />
      likes: {blog.likes} <button id='like-button' onClick={(e) => likeBlog(blog, e)}>like</button><br />
      {blog.user.username} <br />
      {blog.user.username === user.username ? <button id='remove-blog-button' onClick={removeBlog}>remove</button> : null}
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
