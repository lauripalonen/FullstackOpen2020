import React from 'react'
import { Link } from 'react-router-dom'
import { TableRow, TableCell } from '@material-ui/core'

const UserItem = ({ user }) => {
  return (
    <TableRow>
      <TableCell>
        <Link to={`/users/${user.id}`}>{user.username}</Link>
      </TableCell>
      <TableCell>
        {user.blogs.length}
      </TableCell>
    </TableRow>
  )
}

export default UserItem