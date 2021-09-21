describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.createUser({ name: 'TestUser', username: 'testUser', password: 'testPassword' })
    })

    it('Login form is shown', function() {
        cy.visit('http://localhost:3000')
        cy.contains('log in')
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('testUser')
            cy.get('#password').type('testPassword')
            cy.get('#login-button').click()

            cy.contains('TestUser logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('testUser')
            cy.get('#password').type('wrongPassword')
            cy.get('#login-button').click()

            cy.get('.error').contains('wrong username or password')
                .should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'testUser', password: 'testPassword' })
        })

        it('A blog can be created', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('test blog title')
            cy.get('#author').type('test blog author')
            cy.get('#url').type('test blog url')
            cy.get('#create-button').click()

            cy.get('.notification').contains('a new blog test blog title by test blog author added')
                .should('have.css', 'color', 'rgb(0, 128, 0)')
            cy.contains('test blog title test blog author')
        })

        describe('and a blog exists', function () {
            beforeEach(function () {
                cy.createBlog({ title: 'testTitle', author: 'testAuthor', url: 'testUrl' })
            })

            it('it can be made liked', function () {
                cy.contains('likes 0')
                    .contains('like')
                    .click()
                cy.contains('likes 1')
            })

            it('it can be deleted by creator', function () {
                cy.contains('remove').click()
                !cy.contains('testTitle testAuthor')
            })

            describe('When logged in other user', function() {
                beforeEach(function() {
                    cy.createUser({ name: 'TestUser2', username: 'testUser2', password: 'testPassword2' })
                    cy.contains('logout').click()
                    cy.login({ username: 'testUser2', password: 'testPassword2' })
                })

                it('blog cannot be deleted by other user', function () {
                    !cy.contains('remove')
                })
            })
        })
    })
})