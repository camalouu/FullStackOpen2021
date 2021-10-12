import React from 'react'

const Login = ({ setUsername, setPassword, handleLogin }) => {
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