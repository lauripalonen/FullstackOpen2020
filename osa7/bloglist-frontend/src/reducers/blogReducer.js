import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_NOTES':
      action.data.sort((a,b) => b.likes - a.likes)
      return action.data
    case 'NEW_BLOG':
      console.log('GOT REQUEST TO CREATE NEW BLOG')
      console.log('RECEIVED DATA: ', action.data)
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