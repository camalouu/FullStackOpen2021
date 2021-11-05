import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

const Togglabe = ({ children, buttonLabel, show }) => {
  const [visible, setVisible] = useState(show)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const tg = () => {
    setVisible(!visible)
  }
  return (
    <div>
      <br />
      <div style={hideWhenVisible}>
        <Button id='reveal-btn' onClick={tg}> {buttonLabel} </Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button className='mt-2' variant='danger' onClick={tg}>cancel</Button>
      </div>
      <br />
    </div>
  )
}

export default Togglabe