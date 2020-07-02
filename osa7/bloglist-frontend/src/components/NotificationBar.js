import React from 'react'
import { Alert } from '@material-ui/lab'

const NotificationBar = ({ notification }) => {
  if (!notification) {
    return <div className='notification-placeholder'></div>
  }
  return (
    <Alert severity={notification.type}>
      {notification.content}
    </Alert>
  )
}

export default NotificationBar