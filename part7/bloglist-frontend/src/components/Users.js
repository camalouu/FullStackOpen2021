import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUsers } from '../reducers/usersReducer'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  useEffect(() => {
    dispatch(getUsers())
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <Table>
        <tbody>
          <tr>
            <th>#</th>
            <th>users</th>
            <th>Blogs created</th>
          </tr>
          {users.map((user, idx) => <tr key={idx}>
            <td>{idx + 1}</td>
            <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
            <td>{user.blogs.length}</td>
          </tr>)}
        </tbody>
      </Table>
    </div>
  )
}

export default Users