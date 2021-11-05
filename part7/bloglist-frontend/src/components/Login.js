import React from 'react'
import useField from './hooks'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { useHistory } from 'react-router'
import { Button, Form } from 'react-bootstrap'

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
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username: </Form.Label>
        <Form.Control {...username} reset='' />
        <Form.Label>password: </Form.Label>
        <Form.Control {...password} reset='' />
      </Form.Group>
      <Button className='mt-3' variant='success' type="submit">Log in</Button>
    </Form>
  )
}

export default Login