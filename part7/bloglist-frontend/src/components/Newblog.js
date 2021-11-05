import React from 'react'
import useField from './hooks'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
import { Form, Button } from 'react-bootstrap'

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
    <Form onSubmit={handleSubmit}>
      <h1>Create new</h1>
      <Form.Group>
        <Form.Label>Title: </Form.Label>
        <Form.Control {...title} reset='' />
        <Form.Label>Author: </Form.Label>
        <Form.Control {...author} reset='' />
        <Form.Label>Url: </Form.Label>
        <Form.Control {...url} reset='' />
      </Form.Group>
      <Button className='mt-2' variant='success' type='submit'>create</Button>
    </Form>
  )
}

export default NewBlog