import React from 'react'

const Logout = ({ user, handleLogout }) => {
    return (
        <form onSubmit={handleLogout}>
            {user.username} logged in
            <button type='submit'>logout</button>
        </form>
    )
}

export default Logout