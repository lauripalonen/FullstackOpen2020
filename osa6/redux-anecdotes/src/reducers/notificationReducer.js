const initialState = ''

let currentTimeout;

const resetTimeout = () => {
  if (currentTimeout) {
    clearTimeout(currentTimeout)
    currentTimeout = null
  }
}

export const setNotification = (notification, time) => {
  return async dispatch => {
    resetTimeout()

    const dispatched = await dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })

    const reset = { ...dispatched, notification: '' }

    currentTimeout = setTimeout(() => {
      dispatch(reset)
    }, time)

  }

}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export default reducer