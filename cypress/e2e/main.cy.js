describe('Test cases', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3000/')
  })

  it('Field validation check', () => {

    cy.get('[data-testid=input-left]').type(200);
    cy.get('[data-testid=input-left]').should('have.class', 'input-error')
    cy.get('[data-testid=input-left]').clear();
    
    cy.get('[data-testid=input-left]').type(13.388075)
    cy.get('[data-testid=input-left]').not('have.class', 'input-error')

    cy.get('[data-testid=input-bottom]').type(100);
    cy.get('[data-testid=input-bottom]').should('have.class', 'input-error')
    cy.get('[data-testid=input-bottom]').clear();

    cy.get('[data-testid=input-bottom]').type(52.513952)
    cy.get('[data-testid=input-bottom]').not('have.class', 'input-error')

    cy.get('[data-testid=input-right]').type(200);
    cy.get('[data-testid=input-right]').should('have.class', 'input-error')
    cy.get('[data-testid=input-right]').clear();
    
    cy.get('[data-testid=input-right]').type(13.395354)
    cy.get('[data-testid=input-right]').not('have.class', 'input-error')

    cy.get('[data-testid=input-top]').type(100);
    cy.get('[data-testid=input-top]').should('have.class', 'input-error')
    cy.get('[data-testid=input-top]').clear();

    cy.get('[data-testid=input-top]').type(52.516841)
    cy.get('[data-testid=input-top]').not('have.class', 'input-error')

  })

  it('Error case', () => {
    cy.get('[data-testid=input-left]').type(13.388075)
    cy.get('[data-testid=input-bottom]').type(52.513952)
    cy.get('[data-testid=input-right]').type(13.395354)
    cy.get('[data-testid=input-top]').type(53.516841)

    cy.intercept('GET', '**/map?bbox=*').as('getOSM');

    cy.get('[data-testid=submit-btn]').click();

    cy.wait('@getOSM').its('response.statusCode').should('be.oneOf', [400]);
  })

  it('Success case', () => {
    cy.get('[data-testid=input-left]').type(13.388075)
    cy.get('[data-testid=input-bottom]').type(52.513952)
    cy.get('[data-testid=input-right]').type(13.395354)
    cy.get('[data-testid=input-top]').type(52.516841)

    cy.intercept('GET', '**/map?bbox=*').as('getOSM');

    cy.get('[data-testid=submit-btn]').click();

    cy.wait('@getOSM').its('response.statusCode').should('be.oneOf', [200, 304]);
  })

})
