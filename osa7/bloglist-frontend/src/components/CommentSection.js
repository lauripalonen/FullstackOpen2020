import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendError, clearNotification } from '../reducers/notificationReducer'
import { initializeComments, postComment } from '../reducers/commentReducer'

import { List, ListItem, ListItemText, TextField, Button } from '@material-ui/core'


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
      dispatch(clearNotification(5000))
      return
    }

    dispatch(postComment(blog.id, comment))
    event.target.comment.value = ''
  }

  const commentField = (
    <form onSubmit={handleComment}>
      <div>
        <TextField label="new comment" />
      </div>
      <Button variant="contained" color="primary" type="submit" >
        comment
      </Button>
    </form>
  )

  const CommentList = ({ comments }) => (
    <div>
      <List>
        {comments ? comments.map(c =>
          <ListItem dense={true} key={c}>
            <ListItemText primary={c} />
          </ListItem>) : <ListItem></ListItem>
        }
      </List>
    </div>
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