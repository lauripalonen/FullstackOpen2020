import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserDisplay = ({ users }) => {
  const id = useParams().id

  if (!users) {
    return null
  }
  const user = users.find(u => u.id === id)

  const blogList = () => {
    return (
      user.blogs.map(b => <li key={b.id}>{b.title}</li>)
    )
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <h2>Added blogs</h2>
      <ul>
        {blogList()}
      </ul>
    </div>
  )
}

export default UserDisplay