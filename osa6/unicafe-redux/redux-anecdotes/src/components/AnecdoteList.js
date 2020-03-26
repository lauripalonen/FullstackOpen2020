import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { submitVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state =>
    state.anecdotes.filter(a =>
      a.content.toLowerCase()
        .includes(state.filter.toLowerCase()))
  )

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(submitVote(anecdote))
    dispatch(setNotification(`you voted for "${anecdote.content}"`, 5000))
  }
  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList