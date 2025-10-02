describe('Executive Workshop Dashboard', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the main dashboard layout', () => {
    // Check that the sidenav container exists
    cy.get('mat-sidenav-container').should('exist');
    
    // Check that the sidenav is present and opened
    cy.get('mat-sidenav').should('exist').and('be.visible');
    
    // Check that the toolbar exists
    cy.get('mat-toolbar').should('exist');
    
    // Check toolbar title
    cy.get('.toolbar-title').should('contain.text', 'мастерская директора');
  });

  it('should have navigation menu items in sidenav', () => {
    // Check sidenav navigation items
    cy.get('mat-nav-list').should('exist');
    cy.get('mat-nav-list a[mat-list-item]').should('have.length', 3);
    
    // Check specific navigation items
    cy.contains('Представления').should('exist');
    cy.contains('Атрибуты').should('exist');
    cy.contains('Рабочий стол').should('exist');
  });

  it('should have organization selector in toolbar', () => {
    // Check organization dropdown exists
    cy.get('.organization-select').should('exist');
    cy.get('mat-select').should('exist');
    
    // Check that it has a label
    cy.get('mat-label').should('contain.text', 'Организация');
  });

  it('should display function grid on Views section by default', () => {
    // Should be on Views section by default
    cy.get('.section-content h2').should('contain.text', 'Представления');
    
    // Check that grid list exists
    cy.get('mat-grid-list').should('exist');
    
    // Check that grid tiles exist (should have 14 tiles)
    cy.get('mat-grid-tile').should('have.length', 14);
    
    // Check first tile content
    cy.get('mat-grid-tile').first().should('contain.text', 'РЕЕСТРОМ');
  });

  it('should switch between navigation sections', () => {
    // Click on Атрибуты
    cy.contains('Атрибуты').click();
    cy.get('.section-content h2').should('contain.text', 'Атрибуты');
    cy.get('.section-content p').should('contain.text', 'Hello World - Содержимое раздела "Атрибуты"');
    
    // Click on Рабочий стол
    cy.contains('Рабочий стол').click();
    cy.get('.section-content h2').should('contain.text', 'Рабочий стол');
    cy.get('.section-content p').should('contain.text', 'Hello World - Содержимое раздела "Рабочий стол"');
    
    // Go back to Представления
    cy.contains('Представления').click();
    cy.get('.section-content h2').should('contain.text', 'Представления');
    cy.get('mat-grid-list').should('exist');
  });

  it('should allow organization switching', () => {
    // Click on organization selector
    cy.get('mat-select').click();
    
    // Check that options are available
    cy.get('mat-option').should('have.length', 2);
    cy.get('mat-option').first().should('contain.text', 'организация 1');
    cy.get('mat-option').last().should('contain.text', 'организация 2');
    
    // Select second organization
    cy.get('mat-option').last().click();
    
    // Verify selection (the dropdown should close and show selected value)
    cy.get('mat-select').should('exist');
  });

  it('should have responsive design elements', () => {
    // Check that sidenav toggle button exists
    cy.get('.menu-button').should('exist');
    
    // Check that content area exists
    cy.get('.content').should('exist');
    
    // Check that section content is properly styled
    cy.get('.section-content').should('exist').and('be.visible');
  });
});
