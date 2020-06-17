import userService from '../services/users'


const userReducer = (state = null, action) => {
  switch (action.type) {
    case ('GET_USERS'):
      return action.data.users
    default:
      return state
  }
}

export const getUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'GET_USERS',
      data: { users }
    })
  }
}

export default userReducer