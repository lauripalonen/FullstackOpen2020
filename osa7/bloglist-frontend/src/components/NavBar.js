import React from 'react'
import { useDispatch } from 'react-redux'
import { userLogout } from '../reducers/loginReducer'
import { clearNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

import { useHistory } from 'react-router-dom'

import { AppBar, Toolbar, Button } from '@material-ui/core'


const NavBar = ({ loggedUser }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(userLogout())
    dispatch(clearNotification())
    history.push('/login')
  }

  if (loggedUser) {
    return (
      <AppBar position='static'>
        <Toolbar>
          <Button color='inherit' component={Link} to='/blogs'>
            blogs
          </Button>
          <Button color='inherit' component={Link} to='/users'>
            users
          </Button>
          <Button color='inherit' onClick={handleLogout}>
            logout
          </Button>
        </Toolbar>
      </AppBar>
    )
  }
  return (<div></div>)
}

export default NavBar