import React, { useEffect, useState } from 'react'
import { Form, Button, ListGroup } from 'react-bootstrap'
import blogService from '../services/blogs'
import useField from './hooks'

const Comments = ({ id }) => {
  const [comments, setComments] = useState([])
  const comment = useField('text')

  const createComment = async event => {
    event.preventDefault()
    const result = await blogService.createComment(id, comment.value)
    setComments(comments.concat(result))
  }

  useEffect(() => {
    blogService
      .getComments(id)
      .then(response => setComments(response))
  }, [])

  return (
    <div>
      <h2 className='mt-5 mb-3'>Comments</h2>
      <Form onSubmit={createComment}>
        <Form.Control className=' m-2' placeholder='add comment' {...comment} reset='' />
        <Button type="submit">add comment</Button>
      </Form>
      <ListGroup>
        {comments.map(c =>
          <ListGroup.Item className='mt-2 p-2' key={c.id}>
            {c.comment}
          </ListGroup.Item>)}
      </ListGroup>
    </div>
  )
}

export default Comments