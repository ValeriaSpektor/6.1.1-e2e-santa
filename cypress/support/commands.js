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

// Функция для входа в аккаунт
Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('[data-cy="submitButton"]').click();
});

// Функция для добавления участника
Cypress.Commands.add("addParticipant", (name, email) => {
  cy.contains(generalElements.addParticipants).click();
  cy.get(generalElements.nameParticipants).type(name);
  cy.get(generalElements.emailParticipants).type(email);
  cy.get(generalElements.arrowRight).click();
});

// Тест с использованием функций
describe("Add Participants to Existing Box", () => {
  beforeEach(() => {
    cy.visit(inviteLink);
    cy.login(users.userAutor.email, users.userAutor.password);
  });

  it("should display language and box name", () => {
    cy.contains("RU").should("exist");
    cy.contains("Zvezda").should("exist");
  });

  it("should add participants to the box", () => {
    cy.addParticipant("Ivan", "ivan@example.com");
    cy.addParticipant("Sofia", "sofia@example.com");
    cy.addParticipant("Thaya", "thaya@example.com");
    cy.contains(generalElements.submitButton).click();
    cy.contains("Карточка создана").should("exist");
  });
});
