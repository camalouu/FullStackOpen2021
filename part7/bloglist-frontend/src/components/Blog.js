import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'

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
    <div>
      <h1>{blog.title} {blog.author}</h1>
      <div>{blog.url}</div>
      <div>{blog.likes} <button onClick={handleLike}>like</button></div>
      <div>added by {blog.user.username}</div>
      {isCreator && <button onClick={handleRemove}>remove</button>}
    </div>
  )
}

export default Blog