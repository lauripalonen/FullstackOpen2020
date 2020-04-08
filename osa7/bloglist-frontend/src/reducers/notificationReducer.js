const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const createNotification = (content) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: {
      content,
      type: 'notification'
    }
  }
}

export const createError = (content) => {
  return {
    type: 'NEW_ERROR',
    data: {
      content,
      type: 'error'
    }
  }
}

export default notificationReducer