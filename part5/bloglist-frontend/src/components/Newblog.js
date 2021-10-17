import React, { useState } from 'react'
import blogService from '../services/blogs'

const NewBlog = ({ setMessage, setBlogs, toggleVisibility }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        toggleVisibility.tg()
        try {
            await blogService.createBlog({ title, author, url })
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