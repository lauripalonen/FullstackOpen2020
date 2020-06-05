import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import CreateNewForm from './CreateNewForm'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import NotificationBar from './NotificationBar'

import { initializeBlogs } from '../reducers/blogReducer'
import { createNotification, createError } from '../reducers/notificationReducer'

const BlogForm = ({
  user,
  handleLogout,
}) => {
  // const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)

  const createNewFormRef = React.createRef()
  const dispatch = useDispatch()

  const resetNotification = () => {
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  const resetFormFields = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }


  const addBlog = async (blogObject) => {

    try {
      const newBlog = await blogService.create(blogObject)
      createNewFormRef.current.toggleVisibility()
      const newBlogWithUser = { ...newBlog, user: { username: user.username } }

      dispatch({ type: 'NEW_BLOG', data: newBlogWithUser })

      dispatch(createNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`))
      resetNotification()

    } catch (exception) {
      dispatch(createError(`Encountered an error: ${exception.msg}`))
      resetNotification()
    }
    resetFormFields()
  }

  const newBlogForm = () => (
    <Togglable buttonId='new-blog-button' buttonLabel='new blog' ref={createNewFormRef}>
      <CreateNewForm
        addBlog={addBlog}
        title={title}
        author={author}
        url={url}
        handleTitleChange={({ target }) => setTitle(target.value)}
        handleAuthorChange={({ target }) => setAuthor(target.value)}
        handleUrlChange={({ target }) => setUrl(target.value)}
      />
    </Togglable>
  )

  const updateList = (changedBlog) => {
    const updatedList = blogs.map(blog => blog.id !== changedBlog.id ? blog : changedBlog)
    updatedList.sort((a, b) => b.likes - a.likes)
    // setBlogs(updatedList)
    // ADD FUNCTIONALITY TO UPDATE BLOGLIST
  }

  const removeFromList = (removedBlog) => {
    const updatedList = blogs.filter(blog => blog.id !== removedBlog.id)
    // setBlogs(updatedList)
    // ADD FUNCTIONALITY TO UPDATE BLOGLIST
  }

  const likeBlog = async (blog, event) => {
    event.preventDefault()
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    blogService.update(blog.id, changedBlog)
    updateList(changedBlog)
  }


  return (
    <div>
      <NotificationBar notification={notification} />
      <h2>blogs</h2>
      <div>
        {user.name} logged in <button onClick={handleLogout}>log out</button>
      </div>
      {newBlogForm()}
      <div id="blog-list">
        {blogs.map(blog => <Blog
          key={blog.id}
          blog={blog}
          updateList={updateList}
          removeFromList={removeFromList}
          user={user}
          likeBlog={likeBlog}
        />)}
      </div>
    </div>
  )
}

export default BlogForm