import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const user = useSelector(({ users }) =>
    users.find(user => user.id === id)
  )
  if (!user) return null
  return (
    <div>
      <h1>{user.username}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}> {blog.title} </li>
        )}
      </ul>
    </div>
  )
}

export default User