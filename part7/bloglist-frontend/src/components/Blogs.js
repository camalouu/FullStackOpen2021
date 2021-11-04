import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { initilizeBlogs } from '../reducers/blogsReducer'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  useEffect(() => {
    dispatch(initilizeBlogs())
  }, [])
  const blogStyle = {
    display: 'block',
    margin: 5,
    padding: 3,
    border: '1px solid black',
    fontSize: 20
  }
  return (
    <ul>
      {blogs.map(blog =>
        <Link style={blogStyle  } key={blog.id} to={`/blogs/${blog.id}`}>
          {blog.title}
        </Link>
      )}
    </ul>
  )
}

export default Blogs