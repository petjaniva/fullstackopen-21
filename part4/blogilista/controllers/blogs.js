const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({}).populate('user')
    response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id){
      return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id){
    return response.status(401).json({error: 'token missing or invalid'})
  }
  const user = await User.findById(decodedToken.id)
  const id = request.params.id
  const blogToDelete = await Blog.findById(id)
  if (blogToDelete.user._id.toString() === user._id.toString())
  {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({error: 'Unauthorized'})
  }
  
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const blog = {likes: request.body.likes}
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {new: true,})
  response.json(updatedBlog)
})

module.exports = blogRouter