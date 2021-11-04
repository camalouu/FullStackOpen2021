import React, { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import useField from './hooks'

const Comments = ({ id }) => {
  const [comments, setComments] = useState([])
  const comment = useField('text')

  const createComment = async event => {
    event.preventDefault()
    const result = await blogService.createComment(id,comment.value)
    setComments(comments.concat(result))
  }

  useEffect(() => {
    blogService
      .getComments(id)
      .then(response => setComments(response))
  }, [])

  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={createComment}>
        <input {...comment} reset='' />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {comments.map(c => <li key={c.id}> {c.comment}</li>)}
      </ul>
    </div>
  )
}

export default Comments