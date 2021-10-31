import React, { useEffect } from 'react'
import useField from './hooks'
import { useDispatch } from 'react-redux'
import { getFromLocal, login } from '../reducers/userReducer'

const Login = () => {
  const username = useField('text')
  const password = useField('password')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFromLocal())
  }, [])

  const handleLogin = event => {
    event.preventDefault()
    dispatch(login({
      username: username.value,
      password: password.value
    }))
  }

  return (
    <form onSubmit={handleLogin}>
      username: <input id='username' {...username} /><br />
      password: <input id='password' {...password} /><br />
      <button id='login-btn' type="submit">Log in</button>
    </form>
  )
}

export default Login