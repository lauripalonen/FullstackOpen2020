import React from 'react'

import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/loginReducer'
import { useHistory } from 'react-router-dom'


const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    dispatch(userLogin(username, password))

    event.target.username.value = ''
    event.target.password.value = ''
    history.push('/blogs')
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            name="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="password"
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm