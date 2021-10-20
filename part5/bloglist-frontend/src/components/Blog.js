import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {

  const [details, setDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const [showBlog, setShowBlog] = useState(true)

  const blogStyle = {
    display: showBlog ? '' : 'none',
    paddingTop: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }

  const removeButtonStyle = { display: user.username === blog.user.username ? '' : 'none' }

  const handleLike = async () => {
    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: likes + 1
    }
    await blogService.updateBlog(newBlog)
    setLikes(likes + 1)
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      await blogService.deleteBlog(blog)
      setShowBlog(false)
    }
  }

  return (
    <li style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setDetails(!details)}>
          {details ? 'hide' : 'view'}
        </button>
      </div>
      {
        details ?
          <div>
            <div>{blog.url}</div>
            <div>{likes} <button onClick={handleLike}>like</button></div>
            <div>{blog.user.username}</div>
            <button onClick={handleRemove} style={removeButtonStyle}>remove</button>
          </div> :
          <div />
      }
    </li>
  )
}

export default Blog