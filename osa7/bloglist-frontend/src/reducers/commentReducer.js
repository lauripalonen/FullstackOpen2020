import blogService from '../services/blogs'

const commentReducer = (state = [], action) => {
  switch (action.type) {
    case ('INIT_COMMENTS'):
      return action.data.filter(c => c)
    case ('POST_COMMENT'):
      return [...state, action.data]
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

export const postComment = (comment) => {
  return async dispatch => {
    dispatch({
      type: 'POST_COMMENT',
      data: comment
    })
  }
}


export default commentReducer