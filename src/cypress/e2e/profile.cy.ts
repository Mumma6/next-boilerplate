// Cypress E2E Test
describe("Profile", () => {
  it("should navigate to the Profile page", () => {
    cy.getSession()

    // Start from the index page
    cy.visit("http://localhost:3000/profile")

    // The new url should include
    cy.url().should("include", "/profile")

    cy.get("textarea[name=about]", { timeout: 15000 }).type("The quick brown fox jumps over the lazy dog")

    cy.get("button").contains("Update information").click()
  })
})

export {}
