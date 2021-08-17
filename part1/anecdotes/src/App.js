import React, { useState } from 'react'
import anecdotes from './anecdotes'

const DisplayAnecdote = ({ header, anecdote, votes }) =>
  <div>
    <h3>{header}</h3>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </div>

const Button = ({ handleFunction, text }) =>
  <button onClick={handleFunction}>{text}</button>

const App = () => {
  const [state, setState] = useState({
    selected: 0,
    votes: new Array(anecdotes.length).fill(0)
  })

  const randNum = Math.floor(Math.random() * anecdotes.length)

  const nextAnecdote = () => setState({ ...state, selected: randNum })
  const handleVote = () => {
    const copy = [...state.votes]
    copy[state.selected]++
    setState({ ...state, votes: copy })
  }

  const mostVoted = state.votes.reduce((a, b) => Math.max(a, b))

  return (
    <div>
      <DisplayAnecdote
        header="Anecdote of the day"
        anecdote={anecdotes[state.selected]}
        votes={state.votes[state.selected]} />

      <Button handleFunction={handleVote} text="vote" />

      <Button handleFunction={nextAnecdote} text="next anecdote" />
      <DisplayAnecdote
        header="anecdote with most votes"
        anecdote={anecdotes[state.votes.indexOf(mostVoted)]}
        votes={mostVoted} />

    </div>
  )
}

export default App