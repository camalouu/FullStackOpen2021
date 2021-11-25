import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN, ME } from '../queries'

const Login = ({ setToken, show }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [login, result] = useMutation(LOGIN, { refetchQueries: [{ query: ME }] })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            window.localStorage.setItem('user', token)
        }
    }, [result.data]) // eslint-disable-line

    if (!show) return null

    const submit = e => {
        e.preventDefault()
        login({ variables: { username, password } })
    }

    return (
        <form onSubmit={submit}>
            username: <input
                type='text'
                value={username}
                onChange={({ target }) => setUsername(target.value)}
            /> <br />
            password: <input
                type='text'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
            /> <br />
            <button type='submit'>Login</button>
        </form>
    )
}

export default Login