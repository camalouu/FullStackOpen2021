import React, { useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { initilizeBlogs } from '../reducers/blogsReducer'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  useEffect(() => {
    dispatch(initilizeBlogs())
  }, [])

  return (
    <ListGroup numbered>
      {blogs.map(blog =>
        <ListGroup.Item key={blog.id} >
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </ListGroup.Item>
      )}
    </ListGroup>
  )
}

export default Blogs