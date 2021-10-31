import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'

const Logout = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const handleLogout = () => dispatch(logout())

  return (
    <div>
      <form onSubmit={handleLogout}>
        {user.username} logged in
        <button type='submit'>logout</button>
      </form >
    </div >

  )
}

export default Logout