describe('Blog app', function () {
  const user = {
    username: 'zafar',
    password: 'zafar'
  }
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('Log in')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('zafar')
      cy.get('#password').type('zafar')
      cy.get('#login-btn').click()
      cy.contains('zafar logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wronggusernamee')
      cy.get('#password').type('shitshity')
      cy.get('#login-btn').click()
      cy.get('#notification')
        .should('contain', 'invalid username or password')
        .and('have.css', 'border-style', 'dotted')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login(user)
      cy.create({ author: 'author1', title: 'blue whales', url: 'jojo.com', likes: 1 })
      cy.create({ author: 'author2', title: 'getthatbastard', url: 'jojo.com', likes: 23 })
      cy.create({ author: 'author3', title: 'mathafaka', url: 'jojo.com', likes: 21 })
    })

    it('A blog can be created', function () {
      cy.get('#reveal-btn').click({ force: true })

      cy.get('#author').type('steve')
      cy.get('#title').type('7 habits')
      cy.get('#url').type('www.com')
      cy.get('#create-blog-btn').click()

      cy.contains('blue whales')
      cy.contains('getthatbastard')
      cy.contains('mathafaka')
      cy.contains('7 habits')
    })

    it('User can like a blog', function () {
      cy.contains('getthatbastard').find('button').click()
      cy.contains('like').click()
      cy.contains('like').parent().contains('24')
    })

    it('User can delete a blog', function () {
      cy.contains('getthatbastard').find('button').click()
      cy.contains('remove').click()
      cy.contains('getthatbastard')
        .parent()
        .should('have.css', 'display', 'none')
    })

    it('blogs ordered by number of likes', function () {
      cy.get('li').then(list => {
        const ls = list.map((i, el) => el.innerText)
        expect(ls[0]).to.contain('author2')
        expect(ls[1]).to.contain('author3')
        expect(ls[2]).to.contain('author1')
      })
    })
  })


})