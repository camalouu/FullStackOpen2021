import React from 'react'
import Notification from './components/Notification'
import Login from './components/Login'
import Logout from './components/Logout'
import Blogs from './components/Blogs'
import NewBlog from './components/Newblog'
import Togglabe from './components/Togglabe'
import { useSelector } from 'react-redux'
import { isEmptyObject } from './helpers'

const App = () => {
  const user = useSelector(state => state.user)

  if (isEmptyObject(user)) {
    return (
      <div>
        <Notification />
        <Togglabe buttonLabel='Log in'>
          <Login />
        </Togglabe>
      </div>
    )
  }
  return (
    <div>
      <Notification />
      <h1>Blogs</h1>
      <Logout />
      <Togglabe buttonLabel='Create new blog'>
        <NewBlog />
      </Togglabe>
      <Blogs />
    </div>
  )
}

export default App