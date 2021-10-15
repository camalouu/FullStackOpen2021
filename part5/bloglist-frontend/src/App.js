import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import NewBlog from './components/Newblog'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Logout from './components/Logout'
import Toggable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('newuser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
    } catch ({ response }) {
      setMessage(response.data.error)
      setInterval(() => {
        setMessage('')
      }, 5000)
    }
  }

  useEffect(() => {
    const userLoggedIn = window.localStorage.getItem('newuser')
    if (userLoggedIn) {
      const user = JSON.parse(userLoggedIn)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])


  if (user) {
    return (
      <div>
        <Notification message={message} />
        <h1>Blogs</h1>
        <Logout user={user}
          handleLogout={() => window.localStorage.removeItem('newuser')} />
        <Toggable buttonLabel='Create new blog'>
          <NewBlog
            create={blogService.createBlog}
            setBlogs={setBlogs}
            blogs={blogs}
            setMessage={setMessage} />
        </Toggable>
        <Blogs blogs={blogs} />
      </div>
    )
  }

  return (
    <div>
      <Notification message={message} />
      <Toggable buttonLabel='Log in'>
        <Login
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </Toggable>
    </div>
  )
}

export default App