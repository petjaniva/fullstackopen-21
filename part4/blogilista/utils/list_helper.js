const _= require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const mostLikes = (blogs) => {
  let mostLiked = blogs[0]

  blogs.forEach(blog => {
    if (blog.likes > mostLiked.likes)
    {
        mostLiked = blog
    }
  })
  return mostLiked
}

const mostBlogs= (blogs) => {
  const groupedBlogs = _.groupBy(blogs, 'author')
  const blogsByAuthor = _.mapValues(groupedBlogs, 'length')
  const authorWithMostBlogs = Object.entries(blogsByAuthor).reduce((max, current)=> max[1] > current[1] ? max : current)
  return {'author': authorWithMostBlogs[0], 'blogs': authorWithMostBlogs[1]}
}

const mostLikedAuthor = (blogs) => {
    const groupedBlogs = _.groupBy(blogs, 'author')
    const authorsAndLikes = _.mapValues(groupedBlogs, totalLikes)
    const mostLikes = Object.entries(authorsAndLikes).reduce((max, current) => max[1] > current[1] ? max : current)
    return{'author': mostLikes[0], 'likes': mostLikes[1]}
}
  
  module.exports = {
    dummy,
    totalLikes,
    mostLikes,
    mostBlogs,
    mostLikedAuthor
  }