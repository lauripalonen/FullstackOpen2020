import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../reducers/userReducer'
import UserItem from './UserItem'
// import { Table } from 'react-bootstrap'
import { Table, TableBody, TableRow, TableContainer, TableCell, TableHead, Paper } from '@material-ui/core'

const UserList = () => {

  const dispatch = useDispatch()
  const users = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>username</TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!users ? <tr /> : users.map(user => <UserItem key={user.id} user={user} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList