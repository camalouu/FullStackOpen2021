import React, { useState } from 'react'
import blogService from '../services/blogs'

const NewBlog = ({ setMessage, setBlogs, blogs, toggleVisibility }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        toggleVisibility.tg()
        try {
            const createdBlog = await blogService.createBlog({ title, author, url })
            blogs = blogs.concat(createdBlog)
            setBlogs(blogs)
        } catch ({ response }) {
            setMessage(response.data.error)
            setInterval(() => {
                setMessage('')
            }, 5000)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Create new</h1>
                title: <input type='text' onChange={({ target }) => setTitle(target.value)} /> <br />
                author: <input type='text' onChange={({ target }) => setAuthor(target.value)} /><br />
                url: <input type='text' onChange={({ target }) => setUrl(target.value)} /><br />
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default NewBlog