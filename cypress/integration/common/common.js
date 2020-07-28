import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

beforeEach(() => {
  cy.viewport(1900, 1200);
  cy.server();
});

Given('Home page has been loaded', () => {
  cy.visit('/');
});

Given('I visit the following URL: {string}', url => {
  cy.visit(url);
});

Then('I wait {string} ms', time => {
  cy.wait(Number(time));
});

Then('I click a link: {string}', text => {
  // text variable irepresents link's name
  cy.get('a')
    .contains(text)
    .invoke('attr', 'target', '_self')
    .should('have.attr', 'target', '_self')
    .click();
});

Then('I should see {string} in URL', urlPart => {
  cy.url().should('include', urlPart);
});

Then('I should see {string}', text => {
  cy.contains(text);
});
