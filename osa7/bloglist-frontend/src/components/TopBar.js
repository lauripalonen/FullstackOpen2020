import React from 'react'
import { useDispatch } from 'react-redux'
import { userLogout } from '../reducers/loginReducer'
import { clearNotification } from '../reducers/notificationReducer'

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
  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <div>
          {user.name} logged in <button onClick={handleLogout}>log out</button>
        </div>
      </div>
    )
  }

  return (<div></div>)
}

export default TopBar