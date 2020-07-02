import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CreateNewForm from './CreateNewForm'

import { TableContainer, TableCell, TableRow, Paper, TableBody, Table, TableHead } from '@material-ui/core'

const BlogsDisplay = ({ loggedUser }) => {

  const blogs = useSelector(state => state.blogs)

  const BlogList = ({ blogs }) => {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Blog
              </TableCell>
              <TableCell>
                Author
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map(blog => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>
                  {blog.author}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  return (
    <div>
      <CreateNewForm user={loggedUser} />
      <BlogList blogs={blogs} />
    </div>
  )
}

export default BlogsDisplay