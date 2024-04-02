const generalElements = require("../../fixtures/pages/general.json");
const users = require("../../fixtures/users.json");
const invitePage = require("../../fixtures/pages/invitePage.json");
const inviteeDashboardPage = require("../../fixtures/pages/inviteeDashboardPage.json");

describe("Add Participants to Existing Box", () => {
  let inviteLink = "https://santa-secret.ru/box/5b19l7/card?join=chPP8HBQD6my6qW";

  it("Add participants", () => {
    
    cy.visit(inviteLink);

    
    cy.contains("RU").should("exist");
    cy.contains("Zvezda").should("exist");

    
    cy.contains("Создать карточку участника").click({ force: true });

    
    cy.addParticipant("ivan@example.com");
    cy.addParticipant("sofia@example.com");
    cy.addParticipant("thaya@example.com");

    
    cy.contains("Создать карточку").click();

    
    cy.contains("Карточка создана").should("exist");
  });
});
