import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const response = await axios.post(baseUrl, { content, votes: 0 })
    return response.data
}

const update = async anecdote => {
    const url = `${baseUrl}/${anecdote.id}`
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const response = await axios.put(url, newAnecdote)
    return response.data
}

const anecdoteService = {
    getAll, createNew, update
}

export default anecdoteService