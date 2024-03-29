const generalElements = require("./cypress/fixtures/pages/general.json");

describe("user can run raffle", () => {
  it("run raffle", () => {
    cy.visit("https://santa-secret.ru/account/boxes"); 
    cy.contains("Zvezda").click();
    cy.contains("Провести жеребьевку").click();
    cy.get(generalElements.confirmButton).click();
    cy.contains("Да, провести жеребьевку").click();
    cy.contains("Жеребьевка проведена"); 
})
})