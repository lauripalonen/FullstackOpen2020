const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.data
    case 'NEW_ERROR':
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
      type: 'notification'
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

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export default notificationReducer