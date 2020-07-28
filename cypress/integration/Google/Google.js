/// <reference types="cypress" />
import { Given } from 'cypress-cucumber-preprocessor/steps';

Given('Google home page has been loaded', () => {
  cy.logIn();
});
