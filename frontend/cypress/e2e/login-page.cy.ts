/// <reference types="cypress" />

describe('', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000/Login');
  })

  it('allows a user to sign up', () => {
      cy.get('input[name=email]').should('contain.text', '');
      cy.get('input[name=password]').should('contain.text', '');
  })

})
