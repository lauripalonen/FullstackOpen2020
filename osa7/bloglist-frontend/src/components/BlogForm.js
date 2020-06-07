import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import CreateNewForm from './CreateNewForm'
import blogService from '../services/blogs'
import NotificationBar from './NotificationBar'

const BlogForm = ({
  user,
  handleLogout,
}) => {
  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')

  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)

  // const createNewFormRef = React.createRef()
  const dispatch = useDispatch()

  // const resetNotification = () => {
  //   setTimeout(() => {
  //     dispatch({ type: 'CLEAR_NOTIFICATION' })
  //   }, 5000)
  // }

  // const resetFormFields = () => {
  //   setTitle('')
  //   setAuthor('')
  //   setUrl('')
  // }


  // const addBlog = async (blogObject) => {

  //   try {
  //     const newBlog = await blogService.create(blogObject)
  //     createNewFormRef.current.toggleVisibility()
  //     const newBlogWithUser = { ...newBlog, user: { username: user.username } }

  //     dispatch({ type: 'NEW_BLOG', data: newBlogWithUser })

  //     dispatch(createNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`))
  //     resetNotification()

  //   } catch (exception) {
  //     dispatch(createError(`Encountered an error: ${exception.msg}`))
  //     resetNotification()
  //   }
  //   resetFormFields()
  // }

  // const newBlogForm = () => (
  //   <Togglable buttonId='new-blog-button' buttonLabel='new blog' ref={createNewFormRef}>
  //     <CreateNewForm user={user}/>
  //   </Togglable>
  // )

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
    dispatch({ type: 'LIKE_BLOG', blog: blog })
    // const changedBlog = { ...blog, likes: blog.likes + 1 }
    // blogService.update(blog.id, changedBlog)
    // updateList(changedBlog)
  }


  return (
    <div>
      <NotificationBar notification={notification} />
      <h2>blogs</h2>
      <div>
        {user.name} logged in <button onClick={handleLogout}>log out</button>
      </div>
      <CreateNewForm user={user} updateList={updateList} />
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