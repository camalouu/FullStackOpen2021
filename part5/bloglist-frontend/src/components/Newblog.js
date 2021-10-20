import React, { useState } from 'react'
import blogService from '../services/blogs'

const NewBlog = ({ createBlog, setMessage, setBlogs, toggleVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    toggleVisibility.tg() // must be commented when running tests
    try {
      await createBlog({ title, author, url })
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch ({ response }) {
      setMessage(response.data.error)
      setInterval(() => {
        setMessage('')
      }, 5000)
    }
  }

  return (
    <div>
      <form id='blogform' onSubmit={handleSubmit}>
        <h1>Create new</h1>
        title: <input
          id='title'
          value={title}
          type='text'
          onChange={({ target }) => setTitle(target.value)} />
        <br />
        author: <input
          id='author'
          value={author}
          type='text'
          onChange={({ target }) => setAuthor(target.value)} />
        <br />
        url: <input
          id='url'
          value={url}
          type='text'
          onChange={({ target }) => setUrl(target.value)} />
        <br />
        <button id='create-blog-btn' type='submit'>create</button>
      </form>
    </div>
  )
}

export default NewBlog