import React from 'react'
import { connect } from 'react-redux'
import { createFilter } from '../reducers/filterReducer'

const Filter = (props) => {

    const handleChange = (event) => {
        const filter = event.target.value
        props.createFilter(filter)
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default
    connect(null, { createFilter })(Filter)