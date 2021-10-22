
export const voteAnecdote = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const addAnectode = data => {
  return {
    type: 'ADD_ANECDOTE',
    data
  }
}

export const initializeAnecdotes = data => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

const anecdoteRreducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote :
          {
            ...anecdote,
            votes: anecdote.votes + 1
          }
      )
    case 'ADD_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default: return state
  }
}

export default anecdoteRreducer