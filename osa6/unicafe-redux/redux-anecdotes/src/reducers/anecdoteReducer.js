export const createAnecdote = (newAnecdote) => {
  return {
    type: 'CREATE',
    newAnecdote
  }
}

const voteAnecdote = (state, id) => {
  const anecdoteToVote = state.find(a => a.id === id)
  const changedAnecdote = {
    ...anecdoteToVote,
    votes: anecdoteToVote.votes + 1
  }

  return state.map(anecdote =>
    anecdote.id !== id ? anecdote : changedAnecdote)

}

export const submitVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

const reducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE':
      return voteAnecdote(state, action.data.id)
    case 'CREATE':
      return state.concat(action.newAnecdote)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default reducer