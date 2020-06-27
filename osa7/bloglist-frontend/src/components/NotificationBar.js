import React from 'react'
import { Alert } from 'react-bootstrap'

const NotificationBar = ({ notification }) => {
  if (!notification) {
    return <div className='notification-placeholder'></div>
  }
  return (
    <Alert variant={notification.type}>
      {notification.content}
    </Alert>
    // <div className={notification.type}>
    //   {notification.content}
    // </div>
  )
}

export default NotificationBar