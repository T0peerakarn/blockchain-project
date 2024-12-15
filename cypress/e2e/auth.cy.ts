describe('auth page renders normally', () => {


  it('renders without crashing', () => {
    cy.visit('http://localhost:3000/auth')
    cy.get('h1').should('contain', 'Healthcare')
  })

  it('renders login form correctly', () => {
    cy.visit('http://localhost:3000/auth')
    cy.get('input[name="email"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
  })

  it('can login', () => {
    cy.visit('http://localhost:3000/auth')
    cy.wait(300)
    cy.get('input[name="email"]').type('patient0@mail.com', {force: true})
    cy.get('input[name="password"]').type('123456', {force: true})
    cy.get('button[type="submit"]').click({force: true})
    cy.url().should('include', '/patient')
    cy.contains('Hello, ')
  })
})