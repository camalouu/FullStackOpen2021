import React from 'react'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)

  return message &&
    <Alert variant='primary'>
      {message}
    </Alert>
}

export default Notification