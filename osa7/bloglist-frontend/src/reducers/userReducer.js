import loginService from '../services/login'
import blogService from '../services/blogs'
import { clearNotification, sendError, sendNotification } from './notificationReducer'


const userReducer = (state = null, action) => {
  switch (action.type) {
    case ('LOG_IN'):
      blogService.setToken(action.data.user.token)
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(action.data.user))
      return action.data.user
    case ('LOG_OUT'):
      return null
    default:
      return state
  }
}

export const userLogin = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      dispatch({
        type: 'LOG_IN',
        data: { user }
      })
      dispatch(sendNotification(`${username} logged in!`))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    } catch (e) {
      dispatch(sendError('invalid username or password'))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }
}

export const checkLocalStorage = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'LOG_IN',
        data: { user }
      })
    }
  }
}

export const userLogout = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  return dispatch => {
    dispatch({
      type: 'LOG_OUT',
    })
  }
}

export default userReducer