import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'
import Comments from './Comments'

const Blog = () => {
  const id = useParams().id
  const [blog, user] = useSelector(
    ({ blogs, loggedInUser }) =>
      [blogs.find(b => b.id === id), loggedInUser]
  )
  if (!blog) return null

  const dispatch = useDispatch()
  const handleLike = () => {
    dispatch(likeBlog(blog))
  }
  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      dispatch(removeBlog(blog))
    }
  }
  const isCreator = blog.user.username === user.username

  return (
    <Container className=''>
      <h1>{blog.title} {blog.author}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} <Button variant="outline-success" size='sm' onClick={handleLike}>like</Button></div>
      <div>added by {blog.user.username}</div>
      {isCreator && <Button variant='danger' onClick={handleRemove}>remove</Button>}
      <Comments id={id} />
    </Container>
  )
}

export default Blog