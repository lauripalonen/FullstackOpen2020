const initialState = ''

export const setNotification = (notification, time) => {
  return async dispatch => {
    const dispatched = await dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })

    const reset = { ...dispatched, notification: '' }
    setTimeout(() => {
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