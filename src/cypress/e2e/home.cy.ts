// Cypress E2E Test
describe("home", () => {
  it("should navigate to the home page", () => {
    cy.getSession()

    // Start from the index page
    cy.visit("http://localhost:3000/home")

    // The new url should include
    cy.url().should("include", "/home")
  })
})

export {}
