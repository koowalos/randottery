/// <reference types="cypress" />
import { Given } from 'cypress-cucumber-preprocessor';

Given('Google home page has been loaded', () => {
  cy.visit('https://google.com');
});
