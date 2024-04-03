const generalElements = require("../../fixtures/pages/general.json");
const users = require("../../fixtures/users.json");
const invitePage = require("../../fixtures/pages/invitePage.json");
const inviteeDashboardPage = require("../../fixtures/pages/inviteeDashboardPage.json");

describe("Add Participants to Existing Box", () => {
  let inviteLink = "https://santa-secret.ru/box/5b19l7/card?join=chPP8HBQD6my6qW";

  beforeEach(() => {
    cy.visit(inviteLink);
  });

  it("should display language and box name", () => {
    cy.contains("RU").should("exist");
    cy.contains("Zvezda").should("exist");
  });

  it("should add participants to the box", () => {
    cy.contains(generalElements.addParticipants).click();

    cy.get(generalElements.nameParticipants).type("Ivan");
    cy.get(generalElements.emailParticipants).type("ivan@example.com");

    cy.get(generalElements.arrowRight).click();

    cy.get(generalElements.nameParticipants).type("Sofia");
    cy.get(generalElements.emailParticipants).type("sofia@example.com");

    cy.get(generalElements.arrowRight).click();

    cy.get(generalElements.nameParticipants).type("Thaya");
    cy.get(generalElements.emailParticipants).type("thaya@example.com");

    cy.contains(generalElements.submitButton).click();

    cy.contains("Карточка создана").should("exist");
  });
});
