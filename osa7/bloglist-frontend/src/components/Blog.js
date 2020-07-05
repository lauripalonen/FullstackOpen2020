import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeBlog, likeBlog } from '../reducers/blogReducer'

import { sendError, sendNotification, clearNotification } from '../reducers/notificationReducer'
import { useParams, useHistory } from 'react-router-dom'

import { Card, CardContent, Button, makeStyles } from '@material-ui/core'
import { useN03TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n03';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop'
import BrandCardHeader from '@mui-treasury/components/cardHeader/brand'
import TextInfoContent from '@mui-treasury/components/content/textInfo'
import cx from 'clsx'

import blogService from '../services/blogs'
import CommentSection from './CommentSection'

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 343,
    borderRadius: 20,
  },
  content: {
    padding: 24,
  },
}))

const Blog = ({ loggedUser }) => {
  const styles = useN03TextInfoContentStyles()
  const shadowStyles = useLightTopShadowStyles()
  const cardStyles = useStyles()

  const dispatch = useDispatch()
  const history = useHistory()
  const id = useParams().id

  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(b => b.id === id)

  if (!blog) {
    return null
  }

  const handleRemoveBlog = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      const blogTitle = blog.title
      dispatch(removeBlog(blog))
      dispatch(sendNotification(`${blogTitle} removed`))
      dispatch(clearNotification(5000))
      history.push('/')
    }
  }

  const handleLike = (blog, event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  const handleComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    if (!comment) {
      dispatch(sendError('comment cannot be empty'))
      dispatch(clearNotification(5000))
      return
    }
    blogService.addComment(id, comment)
    event.target.comment.value = ''

  }

  return (
    <Card className={cx(cardStyles.root, shadowStyles.root)}>
      <BrandCardHeader extra={`${blog.likes} likes`} />
      <CardContent className={cardStyles.content}>
        <TextInfoContent
          classes={styles}
          overline={blog.author}
          heading={blog.title}
          body={
            <a href={`//${blog.url}`}>{blog.url}</a>
          }
        />
        <TextInfoContent
          classes={styles}
          body={
            `added by ${blog.user.username}`
          }
        />
        {blog.user.username === loggedUser.username ?
          <Button variant="contained" color="primary" onClick={handleRemoveBlog}>
            remove
          </Button> : null}
        <Button variant="contained" color="primary" onClick={(e) => handleLike(blog, e)}>
          like
        </Button>
        <CommentSection blog={blog} handleComment={handleComment} />
      </CardContent>
    </Card >
  )
}

export default Blog
