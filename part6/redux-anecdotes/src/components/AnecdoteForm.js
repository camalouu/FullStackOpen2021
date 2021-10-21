import React from "react"
import { useDispatch } from 'react-redux'
import { addAnectode } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const add = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        dispatch(addAnectode(content))
        e.target.anecdote.value = ''
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