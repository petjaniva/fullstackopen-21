import React, { useState } from 'react'
import PropTypes from 'prop-types'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, update, remove, user }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '': 'none' }

  const [blogObject, setBlogObject] = useState(blog)
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const buttonLabel = visible ? 'hide' : 'view'

  const updateLikes = () => {
    const updatedBlog =({
      ...blogObject,
      likes: blogObject.likes +1 })
    update(updatedBlog)
    setBlogObject(updatedBlog)
  }
  const removeBlog = () => {
    const result = window.confirm('You want to remove', blogObject.name)
    if(result){
      remove(blogObject)
    }
    setBlogObject(null)
  }
  const removeButton = () => {
    if (user.username === blogObject.user.username){
      return (
        <div>
          <p><button id='remove' onClick={removeBlog}>remove</button></p>
        </div>
      )
    }
    else {
      return ('')
    }
  }
  if (!blogObject)
  {
    return ('')
  }
  return (
    <div style={blogStyle}>
      <div>
        {blogObject.title} {blogObject.author} <button id='view' onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div className='extendedView' style={showWhenVisible}>
        <p>{blogObject.url}</p>
        <p>{blogObject.likes} <button id='like' onClick={updateLikes}>like</button></p>
        <p>{blogObject.user.username}</p>
        {removeButton()}
      </div>
    </div>
  )
}

Blog.prototype = {
  blog: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog