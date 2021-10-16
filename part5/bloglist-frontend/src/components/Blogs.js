import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }

  const [details, setDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const showDetails = { display: details ? '' : 'none' }
  //const removeButtonStyle = { display: user.username === blog.user.username ? '' : 'none' }
  const handleLike = async () => {
    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: likes + 1
    }
    await blogService.updateBlog(newBlog)
    setLikes(likes + 1)
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
        {blog.user.username}
      </div>
      <button>remove</button>
    </div>
  )
}

const Blogs = ({ blogs }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  return (
    <div>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs