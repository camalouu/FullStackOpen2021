import React, { useState, useRef } from 'react'
import Notification from './components/Notification'
import Login from './components/Login'
import Logout from './components/Logout'
import Blogs from './components/Blogs'
import NewBlog from './components/Newblog'
import Togglabe from './components/Togglabe'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const blogFormRef = useRef()

  if (user) {
    return (
      <div>
        <Notification message={message} />
        <h1>Blogs</h1>
        <Logout user={user} />
        <Togglabe buttonLabel='Create new blog' ref={blogFormRef}>
          <NewBlog
            setBlogs={setBlogs}
            setMessage={setMessage}
            toggleVisibility={blogFormRef.current} />
        </Togglabe>
        <Blogs user={user} blogs={blogs} setBlogs={setBlogs} />
      </div>
    )
  }

  return (
    <div>
      <Notification message={message} />
      <Togglabe buttonLabel='Log in'>
        <Login
          setUser={setUser}
          setMessage={setMessage}
        />
      </Togglabe>
    </div>
  )
}

export default App