import React from 'react'
import useField from './hooks'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'

const NewBlog = () => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(addBlog({
      title: title.value,
      author: author.value,
      url: url.value
    }))
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      <form id='blogform' onSubmit={handleSubmit}>
        <h1>Create new</h1>
        title: <input id='title' {...title} reset='' /> <br />
        author: <input id='author' {...author} reset='' /> <br />
        url: <input id='url' {...url} reset='' /> <br />
        <button id='create-blog-btn' type='submit'>create</button>
      </form>
    </div>
  )
}

export default NewBlog