import React from 'react'

const NotificationBar = ({ notification }) => {
  if (!notification) {
    return <div></div>
  }
  return (
    <div className={notification.type}>
      {notification.msg}
    </div>
  )
}

export default NotificationBar