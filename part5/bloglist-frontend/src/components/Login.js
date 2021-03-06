import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({ setUser, setMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const userLoggedIn = window.localStorage.getItem('newuser')
    if (userLoggedIn) {
      const user = JSON.parse(userLoggedIn)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [setUser])

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

  return (
    <form onSubmit={handleLogin}>
      username: <input
        id='username'
        type='text'
        onChange={({ target }) => setUsername(target.value)}>
      </input> <br />

      password: <input
        id='password'
        type='password'
        onChange={({ target }) => setPassword(target.value)}>
      </input> <br />

      <button id='login-btn' type="submit">
        Log in
      </button>
    </form>
  )
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
}

export default Login