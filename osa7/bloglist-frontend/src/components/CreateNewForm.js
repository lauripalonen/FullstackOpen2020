import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sendNotification, sendError, clearNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

import blogService from '../services/blogs'
import Togglable from './Togglable'

import { TextField, Button } from '@material-ui/core'

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
    } catch (exception) {
      dispatch(sendError(`Encountered an error: ${exception.msg}`))
      return
    }

    dispatch(sendNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`))
    dispatch(clearNotification(5000))
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

      <div>
        <Togglable buttonId='new-blog-button' buttonLabel='new blog'>
          <h2>Create new</h2>
          <form onSubmit={createNewBlog}>
            <div>
              <TextField label="title" onChange={({ target }) => setTitle(target.value)} />
            </div>
            <div>
              <TextField label="author" onChange={({ target }) => setAuthor(target.value)} />
            </div>
            <div>
              <TextField label="url" onChange={({ target }) => setUrl(target.value)} />
            </div>
            <Button variant="contained" color="primary" type="submit" >
              create
            </Button>
          </form>
        </Togglable>
      </div>

    </div>
  )
}

export default CreateNewForm