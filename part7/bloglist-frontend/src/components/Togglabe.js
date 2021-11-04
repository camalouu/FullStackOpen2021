import React, { useState } from 'react'

const Togglabe = ({ children, buttonLabel }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const tg = () => {
    setVisible(!visible)
  }
  return (
    <div>
      <br />
      <div style={hideWhenVisible}>
        <button id='reveal-btn' onClick={tg}> {buttonLabel} </button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={tg}>cancel</button>
      </div>
      <br />
    </div>
  )
}

export default Togglabe