const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)

describe('trying to create different kinds of users', () => {

    beforeEach(async () =>{
        await User.deleteMany({})
    })
    const goodUser = {
        username: 'Tester',
        name: 'Test McTester',
        password: 'Jiihaa',
        blogs: []
    }
    
    const shortPWDUser = {
        username: 'Tester',
        name: 'Test McTester',
        password: 'Ji',
        blogs: []
    }
    const shortUNUser = {
        username: 'Te',
        name: 'Test McTester',
        password: 'Jiihaa',
        blogs: []
    }
    const noUsername = {
        name: 'Test McTester',
        password: 'Jiihaa',
        blogs: []
    }
    const noPWDUser = {
        username: 'Tester',
        name: 'Test McTester',
        blogs: []
    }
    test('creating a goodUser', async ()=>{
        const result = await api
        .post('/api/users')
        .send(goodUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        expect(result.body.username).toBe('Tester')
    })

    test('too short PWD', async ()=>{
        const result = await api
        .post('/api/users')
        .send(shortPWDUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Password needs to be at least 3 characters long')
    })

    test ('too short UN', async ()=>{
        const result = await api
        .post('/api/users')
        .send(shortUNUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Username must be at least 3 characters')
    })

    test ('no username', async ()=>{
        await api
        .post('/api/users')
        .send(noUsername)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })

    test ('no pwd', async ()=>{
        await api
        .post('/api/users')
        .send(noPWDUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })

    afterAll(() => {
        mongoose.connection.close()
    })
})
