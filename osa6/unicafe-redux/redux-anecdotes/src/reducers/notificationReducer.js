const initialState = ''

export const newNotification = (notification) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: { notification }
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION',
    data: ''
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.data.notification
    case 'RESET_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export default reducer