import React, { useState } from 'react'

const Toggable = ({ children, buttonLabel }) => {

    const [visible, setVisible] = useState(true)

    const showWhenVisible = { display: visible ? '' : 'none' }
    const hideWhenVisible = { display: visible ? 'none' : '' }

    return (
        <div>
            <br />
            <div style={hideWhenVisible}>
                <button onClick={() => setVisible(true)}> {buttonLabel} </button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button onClick={() => setVisible(false)}>cancel</button>
            </div>
            <br />
        </div>
    )
}

export default Toggable