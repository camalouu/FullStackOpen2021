import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }

  const [details, setDetails] = useState(false)
  const show = { display: details ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setDetails(!details)}>
          {details ? 'hide' : 'view'}
        </button>
      </div>
      <div style={show}>
        {blog.url} <br />
        {blog.likes}<br />
        {blog.user.username}
      </div>
    </div>
  )
}

const Blogs = ({ blogs }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs