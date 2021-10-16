import React, { useState, useRef } from 'react'
import Notification from './components/Notification'
import Login from './components/Login'
import Logout from './components/Logout'
import Blogs from './components/Blogs'
import NewBlog from './components/Newblog'
import Toggable from './components/Toggable'

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
        <Toggable buttonLabel='Create new blog' ref={blogFormRef}>
          <NewBlog
            setBlogs={setBlogs}
            blogs={blogs}
            setMessage={setMessage}
            toggleVisibility={blogFormRef.current} />
        </Toggable>
        <Blogs user={user} blogs={blogs} setBlogs={setBlogs} />
      </div>
    )
  }

  return (
    <div>
      <Notification message={message} />
      <Toggable buttonLabel='Log in'>
        <Login
          setUser={setUser}
          setMessage={setMessage}
        />
      </Toggable>
    </div>
  )
}

export default App