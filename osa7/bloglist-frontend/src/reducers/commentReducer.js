import blogService from '../services/blogs'

const commentReducer = (state = '', action) => {
  switch (action.type) {
    case ('POST_COMMENT'):
      blogService.addComment(action.data)
      return action.data.user
    case ('LOG_OUT'):
      return null
    default:
      return state
  }
}

export default commentReducer