import React, { useState, forwardRef, useImperativeHandle } from 'react'

const Toggable = forwardRef((props, ref) => {

    const [visible, setVisible] = useState(true)

    const showWhenVisible = { display: visible ? '' : 'none' }
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const tg = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return { tg }
    })

    return (
        <div>
            <br />
            <div style={hideWhenVisible}>
                <button onClick={tg}> {props.buttonLabel} </button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={tg}>cancel</button>
            </div>
            <br />
        </div>
    )
}
)
export default Toggable