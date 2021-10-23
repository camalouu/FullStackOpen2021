import React from "react"
import { useDispatch } from 'react-redux'
import { addAnectode } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificatinoReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        dispatch(addAnectode(content))
        dispatch(setNotification(`you created ${content}`, 5000))
    }

    return (
        <form onSubmit={add}>
            <h2>create new</h2>
            <div><input name='anecdote' /></div>
            <button type='Submit'>create</button>
        </form>
    )
}

export default AnecdoteForm