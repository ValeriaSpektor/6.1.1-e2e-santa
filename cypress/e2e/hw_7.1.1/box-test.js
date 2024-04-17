const users = require("../fixtures/users.json");
const boxPage = require("../fixtures/pages/boxPage.json");
const generalElements = require("../../fixtures/pages/general.json");
const loginPage = require("../fixtures/pages/loginPage.json");
import { faker } from "@faker-js/faker";

describe("user can create a box", () => {
  let newBoxName = "Zvezda"; 
  let maxAmount = 50; 
  let currency = "Евро";

  it("user logs in", () => {
    cy.visit("https://santa-secret.ru/login");
    cy.login(users.userMain.email, users.userMain.password);
  });

  it("user creates a box", () => {
    cy.contains("Создать коробку").click();
    cy.get(boxPage.boxNameField).type(newBoxName);
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.sixthIcon).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.giftPriceToggle).check({ force: true });
    cy.get(boxPage.maxAmount).type(maxAmount);
    cy.get(boxPage.currency).select(currency);
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(dashboardPage.createdBoxName).should("have.text", newBoxName);
    cy.get(".layout-1__header-wrapper-fixed .toggle-menu-item span")
      .invoke("text")
      .then((text) => {
        expect(text).to.include("Участники");
        expect(text).to.include("Моя карточка");
        expect(text).to.include("Подопечный");
      });
  });
});
