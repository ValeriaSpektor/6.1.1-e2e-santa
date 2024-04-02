// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const loginPage = require("../fixtures/pages/loginPage.json");
const generalElements = require("../fixtures/pages/general.json");

Cypress.Commands.add("addParticipant", (email) => {
  cy.get('[data-cy="add-participant-input"]').type(email);
  cy.get('[data-cy="add-participant-button"]').click();
});

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");
  cy.get('[data-cy="loginField"]', { timeout: 10000 }).type(email); // Увеличиваем таймаут до 10 секунд
  cy.get('[data-cy="passwordField"]').type(password);
  cy.get('[data-cy="submitButton"]').click({ force: true });
});


Cypress.Commands.add("approveAsUser", (user, wishes) => {
  cy.visit(inviteLink);
  cy.get(generalElements.submitButton).click();
  cy.contains("войдите").click();
  cy.login(user.email, user.password);
  cy.contains("Создать карточку участника").should("exist");
  cy.get(generalElements.submitButton).click();
  cy.get(generalElements.arrowRight).click();
  cy.get(generalElements.arrowRight).click();
  cy.get(inviteeBoxPage.wishesInput).type(wishes);
  cy.get(generalElements.arrowRight).click();
  cy.get(inviteeDashboardPage.noticeForInvitee)
    .invoke("text")
    .then((text) => {
      expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
    });
  cy.clearCookies();
});
Cypress.Commands.add("deleteBox", (boxId) => {
  cy.request({
    method: "DELETE",
    url: `/api/boxes/${boxId}`,
    headers: {
      Authorization: "your_auth_token",
    },
  });
});


after("delete box", () => {
  cy.deleteBox("your_box_id");
});
