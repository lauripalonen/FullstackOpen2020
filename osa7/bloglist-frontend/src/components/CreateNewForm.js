import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNotification, createError } from '../reducers/notificationReducer'

import blogService from '../services/blogs'
import Togglable from './Togglable'


const CreateNewForm = (user) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const resetFormFields = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const resetNotification = () => {
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  const addBlog = async (blogObject) => {

    try {
      const newBlog = await blogService.create(blogObject)
      const newBlogWithUser = { ...newBlog, user: { username: user.username } }
      console.log('blog with a user:')
      console.log(newBlogWithUser)
      dispatch({ type: 'NEW_BLOG', data: newBlogWithUser })

      dispatch(createNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`))
      resetNotification()

    } catch (exception) {
      console.log('ERROR: ', exception)
      dispatch(createError(`Encountered an error: ${exception.msg}`))
      resetNotification()
    }
    resetFormFields()
  }

  const createNewBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    setTitle('')
    setAuthor('')
    setUrl('')

    addBlog(blogObject)
  }


  return (
    <div>
      <Togglable buttonId='new-blog-button' buttonLabel='new blog'>
        <div>
          <h2>create new</h2>
          <form onSubmit={createNewBlog}>
            <div>
              title:
              <input type="text"
                id='title'
                value={title}
                name="Title"
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              author:
              <input type="text"
                id='author'
                value={author}
                name="author"
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              url:
              <input type="text"
                id='url'
                value={url}
                name="Url"
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <button id='create-button' type="submit">create</button>
          </form>
        </div>
      </Togglable>
    </div>
  )
}

export default CreateNewForm