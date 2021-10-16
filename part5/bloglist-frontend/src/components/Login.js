import React, { useState, useEffect } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({ setUser, setMessage }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
                type='text'
                onChange={({ target }) => setUsername(target.value)}>
            </input> <br />

            passord: <input
                type='password'
                onChange={({ target }) => setPassword(target.value)}>
            </input> <br />

            <button type="submit">
                Log in
            </button>
        </form>
    )
}

export default Login