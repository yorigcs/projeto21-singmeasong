/// <reference types="cypress" />

Cypress.Commands.add("resetDatabase", () => {
    cy.request("GET", "http://localhost:5000/test/reset-db");
});