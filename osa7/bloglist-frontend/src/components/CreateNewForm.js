import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sendNotification, sendError } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

import blogService from '../services/blogs'
import Togglable from './Togglable'


const CreateNewForm = ({ user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const resetFormFields = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      dispatch(createBlog({ ...newBlog, user: user }))
      dispatch(sendNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`))

    } catch (exception) {
      dispatch(sendError(`Encountered an error: ${exception.msg}`))
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
    resetFormFields()
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