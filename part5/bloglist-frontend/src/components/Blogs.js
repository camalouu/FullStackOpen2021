import React, { useState, useEffect } from 'react'
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

  const showDetails = { display: details ? '' : 'none' }
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
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setDetails(!details)}>
          {details ? 'hide' : 'view'}
        </button>
      </div>
      <div style={showDetails}>
        {blog.url} <br />
        {likes} <button onClick={handleLike}>like</button><br />
        {blog.user.username}<br />
        <button onClick={handleRemove} style={removeButtonStyle}>remove</button>
      </div>
    </div>
  )
}

const Blogs = ({ blogs, setBlogs, user }) => {
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [setBlogs])

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
    </div>
  )
}

export default Blogs