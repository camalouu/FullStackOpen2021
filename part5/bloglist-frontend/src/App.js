import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
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

      console.log(user)
      setUser(user)
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    const userLoggedIn = window.localStorage.getItem('newuser')
    if (userLoggedIn) {
      setUser(JSON.parse(userLoggedIn))
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
        <Logout user={user}
          handleLogout={() => window.localStorage.removeItem('newuser')} />
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