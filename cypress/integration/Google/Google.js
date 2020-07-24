Given('Google home page has been loaded', () => {
    cy.visit('https://google.com');
    cy.wait(3000);
  });