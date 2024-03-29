const generalElements = require("../../fixtures/pages/general.json");

describe("Add Participants to Existing Box", () => {
  let inviteLink = "https://santa-secret.ru/box/lapusik84/card?join=V7a92wUOjSiGPom"; // Ссылка для добавления участников

  beforeEach(() => {
    cy.visit("/login");
    cy.login("vlapin84@gmail.com", "542073");
    cy.contains("Моя коробка").click(); 
  });

  it("add participants", () => {
    cy.visit('https://santa-secret.ru/box/lapusik84/card?join=V7a92wUOjSiGPom'); // Переходим по ссылке для добавления участников
    cy.addParticipant("ivan@example.com");
    cy.addParticipant("sofia@example.com");
    cy.addParticipant("thaya@example.com");
  });
})
  