import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { addmsg, removemsg } from '../reducers/notificatinoReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(({ anecdotes, filter }) => {
        return anecdotes
            .filter(a => a.content.includes(filter))
            .sort((a, b) => b.votes - a.votes)
    })

    const dispatch = useDispatch()

    const notify = anecdote => {
        const message = `you voted for ${anecdote}`
        dispatch(addmsg(message))
        setTimeout(() => {
            dispatch(removemsg())
        }, 5000)
    }

    const vote = (anecdote) => {
        console.log('vote', anecdote)
        dispatch(voteAnecdote(anecdote))
    }

    const handleVote = anecdote => () => {
        vote(anecdote)
        notify(anecdote.content)
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