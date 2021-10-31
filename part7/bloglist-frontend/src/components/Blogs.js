import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initilizeBlogs } from '../reducers/blogsReducer'
import Blog from './Blog'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  useEffect(() => {
    dispatch(initilizeBlogs())
  }, [])

  return (
    <ul>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </ul>
  )
}

export default Blogs