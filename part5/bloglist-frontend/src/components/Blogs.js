import React, { useEffect } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'

const Blogs = ({ blogs, setBlogs, user }) => {
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [setBlogs])

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <ul>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
    </ul>
  )
}

export default Blogs