import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      action.data.sort((a, b) => b.likes - a.likes)
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data.blog]
    case 'LIKE_BLOG': {
      const id = action.data.blog.id
      const blogToUpdate = state.find(b => b.id === id)
      const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
      blogService.update(id, updatedBlog)
      return state.map(blog =>
        blog.id !== id ? blog : updatedBlog)
        .sort((a, b) => b.likes - a.likes)
    }
    case 'REMOVE_BLOG': {
      const id = action.data.blog.id
      blogService.removeBlog(id)
      return state.filter(blog => blog.id !== id)
    }
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return {
    type: 'NEW_BLOG',
    data: { blog }
  }
}

export const removeBlog = (blog) => {
  return {
    type: 'REMOVE_BLOG',
    data: { blog }
  }
}

export const likeBlog = (blog) => {
  return {
    type: 'LIKE_BLOG',
    data: { blog }
  }
}

export default blogReducer