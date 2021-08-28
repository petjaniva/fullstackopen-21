const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('../tests/test_helper')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)
const newBlog = {
    title: 'How to test an app',
    author: 'Coder McCoder',
    url: 'thebestcodingblog.com',
    likes: '5000'
}
const newBlogNoLikes = {
    title: 'How to test an app',
    author: 'Coder McCoder',
    url: 'thebestcodingblog.com',
}
const newBlogNoTitleURL = {
    author: 'Coder McCoder',
    likes: '5000'
}
let headers

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs
        .map(blog=> new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

    await User.deleteMany({})

    const newUser = {
        username: 'tester',
        name: 'Tester McTester',
        password: 'securepassword'
    }

    await api
        .post('/api/users')
        .send(newUser)
    const result = await api
        .post('/api/login')
        .send(newUser)
    headers = {'Authorization': `bearer ${result.body.token}`
    }
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('id for blog is defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('posting a single new blog', async () =>{
    await api
        .post('/api/blogs')
        .send(newBlog)
        .set(headers)
        .expect(200)
        .expect('Content-type', /application\/json/)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length+1)
} )

test('new blog missing likes defaults to 0', async () => {
    const response = await api
    .post('/api/blogs')
    .send(newBlogNoLikes)
    .set(headers)
    .expect(200)
    .expect('Content-type', /application\/json/)

    expect(response.body.likes).toBe(0)
})
test('new blog missing title and url', async () => {
    await api
    .post('/api/blogs')
    .send(newBlogNoTitleURL)
    .set(headers)
    .expect(400)
    .expect('Content-type', /application\/json/)
})

test('deleting a blog', async () => {
    const result = await api
        .post('/api/blogs')
        .send(newBlog)
        .set(headers)
        .expect(200)
        .expect('Content-type', /application\/json/)
    
    const id = result.body.id
    await api
    .delete(`/api/blogs/${id}`)
    .set(headers)
    .expect(204)
    const blogsAfterDel = await api.get('/api/blogs')
    expect(blogsAfterDel.body).toHaveLength(helper.initialBlogs.length)
})
test('updating a blog', async() =>{
    const response = await api.get('/api/blogs')
    const updatedBlog = response.body[0]
    updatedBlog.likes = 505
    const receivedBlog = await api
        .put(`/api/blogs/${updatedBlog.id}`)
        .send(updatedBlog)
    expect(receivedBlog.body.likes).toBe(505)
})

afterAll(() => {
    mongoose.connection.close()
})