import anecdoteService from '../services/anecdotes'

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
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

export const submitVote = (anecdote) => {
  return async dispatch => {
    const changedAnecdote = await anecdoteService
      .vote(
        anecdote.id,
        { ...anecdote, votes: anecdote.votes + 1 }
      )

    dispatch({
      type: 'VOTE',
      data: changedAnecdote
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE':
      return voteAnecdote(state, action.data.id)
    case 'CREATE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default reducer