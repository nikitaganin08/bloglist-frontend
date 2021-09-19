describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const user = {
            name: 'Test test',
            username: 'testUser',
            password: 'testPassword'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
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

            cy.contains('Test test logged in')
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
            cy.get('#username').type('testUser')
            cy.get('#password').type('testPassword')
            cy.get('#login-button').click()
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
    })
})