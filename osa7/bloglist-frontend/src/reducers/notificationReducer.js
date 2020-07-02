const notificationReducer = (state = '', action) => {

  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.data
    case 'NEW_ERROR':
      setTimeout(() => {
      }, 5000)
      return action.data
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const sendNotification = (content) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: {
      content,
      type: 'success'
    }
  }
}

export const sendError = (content) => {
  return {
    type: 'NEW_ERROR',
    data: {
      content,
      type: 'error'
    }
  }
}

export const clearNotification = (timer) => {
  return async dispatch => {
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, timer)
  }
}

export default notificationReducer