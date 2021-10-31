import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)
  const styles = {
    border: '2px dotted black',
    padding: '5px'
  }
  return message &&
    <div id='notification' style={styles}>
      {message}
    </div>
}

export default Notification