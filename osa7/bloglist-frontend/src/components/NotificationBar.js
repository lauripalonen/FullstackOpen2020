import React from 'react'
import { Alert } from '@material-ui/lab'

const NotificationBar = ({ notification }) => {
  if (!notification) {
    return <div className='notification-placeholder'></div>
  }
  return (
    <div className='notification-placeholder'>
      <Alert severity={notification.type}>
        {notification.content}
      </Alert>
    </div>
  )
}

export default NotificationBar