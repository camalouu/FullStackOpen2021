import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'

const Navigation = ({ user }) => {

  const padding = {
    padding: 5,
    display: 'inline-block',
  }
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  const navStyle = {
    display: 'flex',
    margin: 5,
    borderRadius: 2,
    backgroundColor: 'rgb(200,200,200)'
  }

  return (
    <div style={navStyle}>
      <Link style={padding} to='/'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      {
        user.username ? <form onSubmit={handleLogout}>
          <div style={padding} >{user.username} logged in</div>
          <button type='submit' >logout</button>
        </form > : <Link style={padding} to='/login'>login</Link>
      }

    </div >

  )
}

export default Navigation