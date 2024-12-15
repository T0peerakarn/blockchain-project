describe('doctor page renders normally', () => {
    it('renders patients correctly', () => {
        cy.visit('http://localhost:3000/auth')
        cy.wait(500)
        cy.get('input[name="email"]').type('doctor@mail.com', {force: true})
        cy.get('input[name="password"]').type('123456', {force: true})
        cy.get('button[type="submit"]').click({force: true})
        cy.url().should('include', '/doctor')

        cy.get('h2').should('contain', 'Appointment Summary')

    })

    it('renders cases correctly and is clickable', () => {
        cy.visit('http://localhost:3000/auth')
        cy.wait(500)
        cy.get('input[name="email"]').type('doctor@mail.com', {force: true})
        cy.get('input[name="password"]').type('123456', {force: true})
        cy.get('button[type="submit"]').click({force: true})

        cy.url().should('include', '/doctor')
        cy.get('h2').should('contain', 'Appointment Summary')
        cy.get('table').should('be.visible')
        cy.get('table').find('tbody').find('tr').first().find('td').first().click()

        cy.get('h2').should('contain', 'Reschedule the appointment')
        cy.get('h3').should('contain', 'Purpose of visit:')

    })

    it('renders cases page correctly ', () => {
        cy.visit('http://localhost:3000/auth')
        cy.wait(500)
        cy.get('input[name="email"]').type('doctor@mail.com', {force: true})
        cy.get('input[name="password"]').type('123456', {force: true})
        cy.get('button[type="submit"]').click({force: true})
        cy.url().should('include', '/doctor')

        cy.get('button').contains('Cases').click()
        cy.get('table').should('be.visible')
        // check if table column names are correct
        cy.get('table').find('thead').find('tr').find('th').first().should('contain', 'Case Name')
        cy.get('table').find('thead').find('tr').find('th').eq(1).should('contain', 'Patient')
        cy.get('table').find('thead').find('tr').find('th').eq(2).should('contain', 'Status')

    })

    it('render patients page correctly ', () => {
        cy.visit('http://localhost:3000/auth')
        cy.wait(500)
        cy.get('input[name="email"]').type('doctor@mail.com', {force: true})
        cy.get('input[name="password"]').type('123456', {force: true})
        cy.get('button[type="submit"]').click({force: true})
        cy.url().should('include', '/doctor')

        cy.get('button').contains('Patients').click({force: true})
        cy.get('table').should('be.visible')
        cy.get('table').find('thead').find('tr').find('th').first().should('contain', 'Case ID')
        cy.get('table').find('thead').find('tr').find('th').eq(1).should('contain', 'Case Name')
        cy.get('table').find('thead').find('tr').find('th').eq(2).should('contain', 'Status')
    })

})