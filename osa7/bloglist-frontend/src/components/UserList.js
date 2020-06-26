import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../reducers/userReducer'
import UserItem from './UserItem'
import { Table } from 'react-bootstrap'

const UserList = () => {

  const dispatch = useDispatch()
  const users = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {!users ? <tr /> : users.map(user => <UserItem key={user.id} user={user} />)}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList