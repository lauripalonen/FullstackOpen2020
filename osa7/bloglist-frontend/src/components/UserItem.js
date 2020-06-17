import React from 'react'

const UserItem = ({ user }) => {
  return (
    <tr>
      <td>
        {user.username}
      </td>
      <td>
        {user.blogs.length}
      </td>
    </tr>
  )
}

export default UserItem