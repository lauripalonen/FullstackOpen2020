describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    let user = {
      name: 'Theodore Tester',
      username: 'theo',
      password: 'pword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    user = {
      name: 'Thelma Tester',
      username: 'thelma',
      password: 'passw'
    }
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('theo')
      cy.get('#password').type('pword')
      cy.get('#login-button').click()

      cy.contains('Theodore Tester logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('thessa')
      cy.get('#password').type('cat')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('Blog app', function () {

    describe('When logged in', function () {
      beforeEach(function () {
        cy.get('#username').type('theo')
        cy.get('#password').type('pword')
        cy.get('#login-button').click()
      })


      it('a blog can be created', function () {
        cy.contains('new blog').click()
        cy.get('#title').type('a blog title by cypress test')
        cy.get('#author').type('Cypress')
        cy.get('#url').type('www.cypress.io')
        cy.get('#create-button').click()
        cy.contains('a blog title by cypress test')
      })

      describe('and when blog is created', function () {
        beforeEach(function () {
          cy.contains('new blog').click()
          cy.get('#title').type('a blog title by cypress test')
          cy.get('#author').type('Cypress')
          cy.get('#url').type('www.cypress.io')
          cy.get('#create-button').click()
        })

        it('a blog can be liked', function () {
          cy.get('#display-toggle-button').click()
          cy.get('#like-button').click()
          cy.contains('likes: 1')
        })

        it('a blog can be removed', function () {
          cy.get('#display-toggle-button').click()
          cy.get('#remove-blog-button').click()
          cy.on('window:confirm', cy.stub().as('confirm'))
          cy.get('@confirm').should('have.been.calledWith', 'Remove blog a blog title by cypress test?')
          cy.contains('.blog-item').should('not.exist')
        })
      })

      describe('and when multiple blogs are created', function () {
        beforeEach(function () {
          cy.get('#new-blog-button').click()
          cy.get('#title').type('first blog')
          cy.get('#author').type('Cypress')
          cy.get('#url').type('www.cypress.io')
          cy.get('#create-button').click()

          cy.wait(1000)

          cy.get('#new-blog-button').click()
          cy.get('#title').type('second blog')
          cy.get('#author').type('Cypress')
          cy.get('#url').type('www.cypress.io')
          cy.get('#create-button').click()

          cy.wait(1000)

          cy.get('#new-blog-button').click()
          cy.get('#title').type('third blog')
          cy.get('#author').type('Cypress')
          cy.get('#url').type('www.cypress.io')
          cy.get('#create-button').click()

          cy.wait(1000)
        })

        it('list contains three blogs', function () {
          cy.get('#blog-list').children().should('have.length', 3)
        })

        it('list is ordered by likes', function () {
          cy.get('#blog-list')
            .contains('second blog')
            .contains('view').click()

          cy.get('#like-button').click()
          cy.get('#like-button').click()
          cy.contains('hide').click()

          cy.get('#blog-list')
            .contains('third blog')
            .contains('view').click()

          cy.get('#like-button').click()
          cy.get('#like-button').click()
          cy.get('#like-button').click()

          cy.get('#blog-list')
            .get('.blog-item')
            .first()
            .contains('third blog')
            .get('#remove-blog-button')
            .click()

          cy.wait(2000)

          cy.get('#blog-list')
            .get('.blog-item')
            .first()
            .contains('second blog')
        })

      })

    })

  })
})

