import React, { useState } from 'react'

const NewBlog = ({ create, setBlogs, blogs }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const createdBlog = await create({ title, author, url })
        blogs = blogs.concat(createdBlog)
        setBlogs(blogs)
        console.log(createdBlog)
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