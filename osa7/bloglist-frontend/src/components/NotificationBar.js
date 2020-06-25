import React from 'react'

const NotificationBar = ({ notification }) => {

  if (!notification) {
    return <div className='notification-placeholder'></div>
  }
  return (
    <div className={notification.type}>
      {notification.content}
    </div>
  )
}

export default NotificationBar