import React from 'react'
import { useDispatch } from 'react-redux'
import { userLogout } from '../reducers/loginReducer'
import { clearNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

import { useHistory } from 'react-router-dom'


const TopBar = ({ user }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(userLogout())
    dispatch(clearNotification())
    history.push('/login')
  }

  const padding = {
    padding: 5
  }
  if (user) {
    return (
      <div className='top-bar'>
        <Link to='/blogs' style={padding}>blogs</Link>
        <Link to='/users' style={padding}>users</Link>
        {user.name} logged in <button onClick={handleLogout}>log out</button>
      </div>
    )
  }

  return (<div></div>)
}

export default TopBar