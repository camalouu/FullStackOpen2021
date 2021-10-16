import React from 'react'

const Logout = ({ user }) => {
    const handleLogout = () => window.localStorage.removeItem('newuser')
    
    return (
        <div>
            <form onSubmit={handleLogout}>
                {user.username} logged in
                <button type='submit'>logout</button>
            </form >
        </div >

    )
}

export default Logout