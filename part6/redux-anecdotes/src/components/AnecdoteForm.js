import React from "react"
import { connect } from 'react-redux'
import { addAnectode } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificatinoReducer'

const AnecdoteForm = (props) => {

    const add = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        props.addAnectode(content)
        props.setNotification(`you created ${content}`, 5000)
    }

    return (
        <form onSubmit={add}>
            <h2>create new</h2>
            <div><input name='anecdote' /></div>
            <button type='Submit'>create</button>
        </form>
    )
}

const mapDispatchToProps = {
    addAnectode,
    setNotification
}

export default
    connect(null, mapDispatchToProps)(AnecdoteForm)