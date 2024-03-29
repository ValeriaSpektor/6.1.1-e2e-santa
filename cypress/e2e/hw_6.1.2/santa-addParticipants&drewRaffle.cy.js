const generalElements = require("../fixtures/pages/general.json");
const users = require("../fixtures/users.json");
const invitePage = require("../fixtures/pages/invitePage.json");
const inviteeDashboardPage = require("../fixtures/pages/inviteeDashboardPage.json");

describe("Add Participants and Draw Raffle", () => {
  let inviteLink;

  beforeEach(() => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.contains("Моя коробка").click();
  });

  it("add participants and draw raffle", () => {
    // Add participants
    cy.get(generalElements.submitButton).click();
    cy.get(invitePage.inviteLink).invoke("text").then((link) => {
      inviteLink = link;
    });
    cy.clearCookies();
    cy.addParticipant("ivan@example.com");
    cy.addParticipant("sofia@example.com");
    cy.addParticipant("thaya@example.com");

    // Draw raffle
    cy.visit("https://santa-secret.ru/box/lapusik84/draw");
    cy.contains("Провести жеребьевку").click();
    cy.contains("Да, провести жеребьевку").click();
    cy.contains("Жеребьевка проведена").should("exist");
  });
});
