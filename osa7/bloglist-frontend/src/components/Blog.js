import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, user, likeBlog }) => {
  const [simpleDisplay, setSimpleDisplay] = useState(true)

  const buttonText = () => (simpleDisplay ? 'view' : 'hide')

  const dispatch = useDispatch()

  const handleButtonClick = async (event) => {
    event.preventDefault()
    setSimpleDisplay(!simpleDisplay)
  }

  const removeBlog = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      dispatch({ type: 'REMOVE_BLOG', blog })
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
