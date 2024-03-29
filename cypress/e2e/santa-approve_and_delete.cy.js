const generalElements = require("../fixtures/pages/general.json");
const users = require("../fixtures/users.json");
const inviteeBoxPage = require("../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../fixtures/pages/inviteeDashboardPage.json");
import { faker } from "@faker-js/faker";

describe("Approve Box and Delete", () => {
  let inviteLink;
  let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();

  beforeEach(() => {
    cy.visit("/login");
    cy.login(users.user1.email, users.user1.password);
  });

  it("approve as user1", () => {
    cy.contains("Моя коробка").click();
    cy.get(inviteeBoxPage.inviteLink).invoke("text").then((link) => {
      inviteLink = link;
    });

    cy.visit(inviteLink);
    cy.get(generalElements.submitButton).click();
    cy.contains("войдите").click();
    cy.contains("Создать карточку участника").should("exist");
    cy.get(generalElements.submitButton).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(inviteeBoxPage.wishesInput).type(wishes);
    cy.get(generalElements.arrowRight).click();
    cy.get(inviteeDashboardPage.noticeForInvitee).invoke("text").then((text) => {
      expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
    });
    cy.clearCookies();
  });

  after("delete box", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.contains("Моя коробка").click();
    cy.contains("Архивация и удаление").click({ force: true });
    cy.get(".form-page-group__main > .frm-wrapper > .frm").type("Удалить коробку");
    cy.get(".btn-service").click();
  });
});
