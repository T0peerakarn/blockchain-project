describe('patient page renders normally', () => {

    it('renders appointments table correctly', () => {
        cy.visit('http://localhost:3000/auth')
        cy.wait(500)
        cy.get('input[name="email"]').type('patient1@mail.com', {force: true})
        cy.get('input[name="password"]').type('123456', {force: true})
        cy.get('button[type="submit"]').click({force: true})
        cy.url().should('include', '/patient')

        cy.get('h2').should('contain', 'Appointment')
        cy.get('table').should('be.visible')
    })

    it('renders cases correctly and is clickable', () => {

        cy.visit('http://localhost:3000/auth')
        cy.wait(500)
        cy.get('input[name="email"]').type('patient1@mail.com', {force: true})
        cy.get('input[name="password"]').type('123456', {force: true})
        cy.get('button[type="submit"]').click({force: true})
        cy.url().should('include', '/patient')

        cy.get('h2').should('contain', 'Appointment')
        cy.get('table').should('be.visible')
        cy.get('table').find('tbody').find('tr').first().find('td').first().click()
        cy.get('h3').should('contain', 'Appointment Name:')
        cy.get('h3').should('contain', 'Datetime:')
        cy.get('h3').should('contain', 'Doctor')

    })

    it('renders medical history correctly', () => {
        cy.visit('http://localhost:3000/auth')
        cy.wait(500)
        cy.get('input[name="email"]').type('patient1@mail.com', {force: true})
        cy.get('input[name="password"]').type('123456', {force: true})
        cy.get('button[type="submit"]').click({force: true})
        cy.url().should('include', '/patient')


        cy.get('button').contains('Medical History').click()
        cy.get('table').should('be.visible')
        cy.get('table').find('thead').find('tr').find('th').first().should('contain', 'Purpose of visit')
        cy.get('table').find('thead').find('tr').find('th').eq(1).should('contain', 'Created at')
    })



})