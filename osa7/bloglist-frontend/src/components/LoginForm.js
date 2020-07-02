import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/loginReducer'
import { useHistory } from 'react-router-dom'

import { TextField, Button } from '@material-ui/core'

const LoginForm = () => {
  const [values, setValues] = useState({ username: '', password: '' })

  const dispatch = useDispatch()
  const history = useHistory()

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(userLogin(values.username, values.password))
    setValues({ username: '', password: '' })
    history.push('/blogs')
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin} >
        <div>
          <TextField label="username" onChange={handleChange('username')} />
        </div>
        <div>
          <TextField label="password" type='password' onChange={handleChange('password')} />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit" >
            login
          </Button>
        </div>
      </form>
    </div >
  )
}

export default LoginForm