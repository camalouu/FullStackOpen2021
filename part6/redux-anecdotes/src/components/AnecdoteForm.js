import React from "react"
import { useDispatch } from 'react-redux'
import { addAnectode } from '../reducers/anecdoteReducer'
import { addmsg, removemsg } from '../reducers/notificatinoReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const add = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        dispatch(addAnectode(content))
        e.target.anecdote.value = ''

        const message = `you created ${content}`
        dispatch(addmsg(message))
        setTimeout(() => {
            dispatch(removemsg())
        }, 5000)
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