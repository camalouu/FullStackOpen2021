import React from 'react'
import useField from './hooks'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { useHistory } from 'react-router'

const Login = () => {
  const username = useField('text')
  const password = useField('password')
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = event => {
    event.preventDefault()
    dispatch(login({
      username: username.value,
      password: password.value
    }))
    history.push('/')
  }

  return (
    <form onSubmit={handleLogin}>
      username: <input id='username'{...username} reset='' /><br />
      password: <input id='password'{...password} reset='' /><br />
      <button id='login-btn' type="submit">Log in</button>
    </form>
  )
}

export default Login