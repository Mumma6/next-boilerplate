import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    // https://docs.cypress.io/guides/references/configuration#e2e
    baseUrl: "http://localhost:3000",
    defaultCommandTimeout: 15000,
    // Whether or not test isolation is enabled to ensure a clean browser context between tests.
    testIsolation: false,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  // Settings
  env: {
    baseUrl: "http://localhost:3000",
    username: "cypress@test.com",
    password: "cypress@test.com",
  },
})
