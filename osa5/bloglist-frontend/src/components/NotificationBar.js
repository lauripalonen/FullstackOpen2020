import React from 'react'

const notificationBar = ({ notification }) => {
  if (!notification) {
    return <div></div>
  }
  return (
    <div className={notification.type}>
      {notification.msg}
    </div>
  )
}

export default notificationBar