import React from 'react'

import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/loginReducer'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control type="text" name="username"/>
          <Form.Label>password:</Form.Label>
          <Form.Control type="password" name="password"/>
          <Button variant="primary" type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm