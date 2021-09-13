import React, { useState } from 'react'

const BlogForm = ({ createBlog }) =>
{
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()
    createBlog({ title: newTitle,
      author: newAuthor,
      url: newUrl, })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
  return(
    <div>
      <form onSubmit={handleCreateBlog}>
        <div>Title:
          <input
            id="title"
            value={newTitle}
            name="title"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>Author:
          <input
            id="author"
            value={newAuthor}
            name="author"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>URL:
          <input
            id="url"
            value={newUrl}
            name="url"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button id='create' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm