import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_NOTES':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: blogs
    })
  }
}

export const createBlog = (data) => {
  return {
    type: 'NEW_BLOG',
    data,
  }
}

export default blogReducer