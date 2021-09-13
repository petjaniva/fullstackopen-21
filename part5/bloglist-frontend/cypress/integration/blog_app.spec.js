describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Tester McTesterface',
        username: 'tester',
        password: 'secure'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user) 
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('username')
    })
    describe('Login',function() {
        it('succeeds with correct credentials', function() {
          cy.get('#username').type('tester')
          cy.get('#password').type('secure')
          cy.get('#login-button').click()
          cy.contains('Tester McTesterface')
        })
    
        it('fails with wrong credentials', function() {
            cy.get('#username').type('tester')
            cy.get('#password').type('notsecure')
            cy.get('#login-button').click()
            cy.get('.error')
                .should('contain', 'Wrong credentials')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
        })
      })
    describe('When logged in', function() {
        beforeEach(function() {
           cy.request('POST', 'http://localhost:3003/api/login/',{
               username: 'tester', password: 'secure'
           }).then(response => {
               localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
               cy.visit('http://localhost:3000')
           })
        })
    
        it('A blog can be created', function() {
          cy.contains('create a new blog').click()
          cy.get('#title').type('Real title')
          cy.get('#author').type('Real author')
          cy.get('#url').type('Real URL')
          cy.get('#create').click()
          cy.contains('Real title')
        })
        it('Blogs can be liked', function(){
          cy.contains('create a new blog').click()
          cy.get('#title').type('Real title')
          cy.get('#author').type('Real author')
          cy.get('#url').type('Real URL')
          cy.get('#create').click()
          cy.get('#view').click()
          cy.get('#like').click()
          cy.contains('1')
        })
        it('Blogs can be removed', function(){
            cy.contains('create a new blog').click()
            cy.get('#title').type('Real title')
            cy.get('#author').type('Real author')
            cy.get('#url').type('Real URL')
            cy.get('#create').click()
            cy.get('#view').click()
            cy.get('#remove').click()
            cy.on('windows:confirm', () => true)
            cy.get('html').should('not.contain', 'Real title')
          })
      })
      describe('more than one blog', function () {
        beforeEach(function () {
            cy.request('POST', 'http://localhost:3003/api/login/',{
                username: 'tester', password: 'secure'
            }).then(response => {
                localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
                cy.visit('http://localhost:3000')
            })
          const blog1 = {
            title: 'Mid likes',
            author: 'Bit Likeable',
            url: 'http://example.com',
            likes: 2,
          }
          const blog2 = {
            title: 'Least likes',
            author: 'Not Likeable',
            url: 'http://example.com',
            likes: 1,
          }
          const blog3 = {
            title: 'Most Likes',
            author: 'Very Likeable',
            url: 'http://example.com',
            likes: 5,
          }
          cy.createBlog(blog1)
          cy.createBlog(blog3)
          cy.createBlog(blog2)
        })

        it('and the first blog has most likes', function () {
            cy.visit('http://localhost:3000')
          cy.contains('view').click()
          cy.contains(5)
        })
      })
  })