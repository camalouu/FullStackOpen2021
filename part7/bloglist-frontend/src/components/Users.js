import React, { useEffect } from 'react'
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
      <h1>Users</h1>
      <table>
        <tbody>
          <td>
            <tr> users </tr> <br />
            {users.map(user => <tr key={user.id}>
              <Link to={`/users/${user.id}`}>{user.username}</Link>
            </tr>)}
          </td>
          <td>
            <tr> blogs created </tr> <br />
            {users.map(user => <tr key={user.id}>{user.blogs.length}</tr>)}
          </td>
        </tbody>
      </table>
    </div>
  )
}

export default Users