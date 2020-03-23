import React, { useState } from 'react'


const CreateNewForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createNewBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    setTitle('')
    setAuthor('')
    setUrl('')

    addBlog(blogObject)
  }


  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNewBlog}>
        <div>
          title:
          <input type="text"
            id='title'
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input type="text"
            id='author'
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input type="text"
            id='url'
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='create-button' type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateNewForm