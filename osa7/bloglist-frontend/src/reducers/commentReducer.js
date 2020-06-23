import blogService from '../services/blogs'

const commentReducer = (state = [], action) => {
  switch (action.type) {
    case ('INIT_COMMENTS'):
      return action.data.filter(c => c)
    case ('POST_COMMENT'):
      blogService.addComment(action.data)
      return action.data.user
    default:
      return state
  }
}

export const initializeComments = (blog) => {
  return async dispatch => {
    dispatch({
      type: 'INIT_COMMENTS',
      data: blog.comments
    })
  }
}


export default commentReducer