/// <reference types="cypress" />

Cypress.Commands.add("resetDatabase", () => {
    cy.request("GET", "http://localhost:5000/test/reset-db");
});

Cypress.Commands.add("createRecommendation", (name, youtubeLink) => {
    cy.request("POST", "http://localhost:5000/recommendations/", {name, youtubeLink});
});