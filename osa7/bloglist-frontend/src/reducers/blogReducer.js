import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_NOTES':
      action.data.sort((a, b) => b.likes - a.likes)
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG':
      var id = action.blog.id
      var blogToUpdate = state.find(b => b.id === id)
      var updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
      blogService.update(id, updatedBlog)
      return state.map(blog =>
        blog.id !== id ? blog : updatedBlog)
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

// export const createBlog = (data) => {
//   return {
//     type: 'NEW_BLOG',
//     data,
//   }
// }

// export const likeBlog = (data) => {
//   return {
//     type: 'LIKE_BLOG',
//     data
//   }
// }

export default blogReducer