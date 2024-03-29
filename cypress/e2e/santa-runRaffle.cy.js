const generalElements = require("../fixtures/pages/general.json");

describe("user can run raffle", () => {
  it("run raffle", () => {
    cy.visit("/login");
    cy.login("your_email@example.com", "your_password");
    cy.contains("Моя коробка").click();
    cy.contains("Запустить жеребьевку").click();
    cy.get(generalElements.confirmButton).click();
  });
});
