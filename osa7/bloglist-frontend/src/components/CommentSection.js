import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendError } from '../reducers/notificationReducer'
import { initializeComments, postComment } from '../reducers/commentReducer'


const CommentSection = ({ blog }) => {
  const dispatch = useDispatch()
  const comments = useSelector(state => state.comments)

  useEffect(() => {
    dispatch(initializeComments(blog))
  }, [dispatch, blog])

  const handleComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value

    if (!comment) {
      dispatch(sendError('comment cannot be empty'))
      return
    }

    dispatch(postComment(blog.id, comment))
    event.target.comment.value = ''
  }

  const commentField = (
    <form onSubmit={handleComment}>
      <input type="text"
        id='comment'
        name="Comment"
      />
      <button type='submit'>comment</button>
    </form>
  )

  const CommentList = ({ comments }) => (
    <ul>
      {comments ? comments.map(c => <li key={c}>{c}</li>) : ''}
    </ul>
  )

  return (
    <div>
      <h3>Comments</h3>
      {commentField}
      <CommentList comments={comments} />
    </div>
  )
}

export default CommentSection