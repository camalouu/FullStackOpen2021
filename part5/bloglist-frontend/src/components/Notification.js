import React from 'react'

const Notification = ({ message }) => {
  const styles = {
    border: '2px dotted black',
    padding: '5px'
  }
  if (message)
    return (
      <div style={styles}>
        {message}
      </div>
    )
  return <br />
}

export default Notification