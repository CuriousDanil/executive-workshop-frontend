describe('Executive\'s Workshop App', () => {
  it('Should display the homepage correctly', () => {
    cy.visit('/');

    // Check brand name in navigation
    cy.contains('Executive\'s Workshop');
    
    // Check main hero content
    cy.contains('Transform Your Business Operations');
    
    // Check navigation menu items are visible
    cy.contains('Solutions');
    cy.contains('Services');
    
    // Check auth buttons
    cy.contains('Login');
    cy.contains('Register');
    
    // Check language selector exists
    cy.get('.language-selector').should('exist');
  });

  it('Should navigate to registration page', () => {
    cy.visit('/');
    
    // Click register button
    cy.contains('Register').click();
    
    // Check we're on registration page
    cy.url().should('include', '/registration');
    cy.contains('Create Account');
  });
});
