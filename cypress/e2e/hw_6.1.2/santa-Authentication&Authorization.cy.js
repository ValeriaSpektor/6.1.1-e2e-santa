const generalElements = require("../fixtures/pages/general.json");
const users = require("../fixtures/users.json");

describe("Authentication and Authorization", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should login with valid credentials", () => {
    cy.login(users.validUser.email, users.validUser.password);
    cy.url().should("include", "/box/lapusik84");
  });

  it("should display error with invalid credentials", () => {
    cy.login(users.invalidUser.email, users.invalidUser.password);
    cy.contains("Invalid email or password").should("be.visible");
    cy.url().should("include", "/login");
  });

  it("should redirect to login page when accessing restricted area without authentication", () => {
    cy.visit("/box/lapusik84");
    cy.url().should("include", "/login");
  });

  it("should logout successfully", () => {
    cy.login(users.validUser.email, users.validUser.password);
    cy.contains("Logout").click();
    cy.url().should("include", "/login");
  });

  it("should not display box page after logout", () => {
    cy.login(users.validUser.email, users.validUser.password);
    cy.contains("Logout").click();
    cy.visit("/box/lapusik84");
    cy.url().should("include", "/login");
  });
});
