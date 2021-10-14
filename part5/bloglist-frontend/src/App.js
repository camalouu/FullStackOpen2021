import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import NewBlog from './components/Newblog'
import Blogs from './components/Blogs'
import Logout from './components/Logout'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('newuser', JSON.stringify(user))

      setUser(user)
      blogService.setToken(user.token)

    } catch (error) {
      console.log(error)
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
        <h1>Blogs</h1>
        <Logout user={user}
          handleLogout={() => window.localStorage.removeItem('newuser')} />
        <NewBlog create={blogService.createBlog} setBlogs={setBlogs} blogs={blogs} />
        <Blogs blogs={blogs} />
      </div>
    )
  }

  return (
    <Login
      setUsername={setUsername}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  )
}

export default App