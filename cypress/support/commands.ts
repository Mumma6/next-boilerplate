/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

Cypress.Commands.add("getSession", () => {
  const { username, password } = Cypress.env()
  cy.login(username, password)
})
Cypress.Commands.add("login", (username, password) => {
  cy.session([username, password], () => {
    cy.visit("http://localhost:3000/")

    // Find a button with class and contains text
    cy.get(".MuiButton-root").contains("Sign in").click()

    // The new url should include
    cy.url().should("include", "/login")

    cy.get("input[name=email]", { timeout: 15000 }).type(username)
    cy.get("input[name=email]").should("have.value", username)

    cy.get("input[name=password]").type(password)
    cy.get("input[name=password]").should("have.value", password)

    cy.get(".MuiButton-root").contains("Sign in Now").click()

    cy.url({ timeout: 15000 }).should("include", "/home")
  })
})

declare global {
  namespace Cypress {
    interface Chainable {
      getSession(): Chainable<void>
      login(email: string, password: string): Chainable<void>
    }
  }
}

export {}
