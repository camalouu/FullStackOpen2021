import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificatinoReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        return anecdotes
            .filter(a => a.content.includes(filter))
            .sort((a, b) => b.votes - a.votes)
    })

    const dispatch = useDispatch()

    const handleVote = anecdote => () => {
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`you voted for ${anecdote.content}`, 5000))
    }

    return (
        anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div> {anecdote.content} </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={handleVote(anecdote)}>
                        vote
                    </button>
                </div>
            </div>
        )
    )
}

export default AnecdoteList