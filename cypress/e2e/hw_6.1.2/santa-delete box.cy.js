import { cy } from "cypress";
const generalElements = require("../../fixtures/pages/general.json");
const users = require("../../fixtures/users.json");
const inviteeBoxPage = require("../../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../../fixtures/pages/inviteeDashboardPage.json");
beforeEach(() => {
  cy.visit("/login");
});

it.only('should successfully send DELETE request', () => {
  cy.visit("/login");
  cy.login(users.userAutor.email, users.userAutor.password);
  cy.request({
    method: "GET",
    url: "https://staging.lpitko.ru/api/account/boxes/"
  }).then((response) => {
    expect(response.status).to.eq(200);

    const boxes = response.body;
    
    boxes.forEach(box => {
      cy.request({
        method: "DELETE",
        url: `https://staging.lpitko.ru/api/account/box/${boxes.key}/`
      }).then(deleteResponse => {
        expect(deleteResponse.status).to.eq(200); 
      });
    });
  });
});

after("delete box", () => {
  cy.visit("/login");
  cy.login(users.userAutor.email, users.userAutor.password);
  cy.contains("span", "Коробки").click();
  cy.get(generalElements.firstBox).first().click();
  cy.get(generalElements.toggleButton).click({ force: true });
  cy.contains("Архивация и удаление").click({ force: true });
  cy.get(generalElements.deleteBox).type("Удалить коробку");
  cy.get(generalElements.deleteButton).click({ force: true });

 
  cy.contains("span", "Коробки").click(); 
  cy.get(generalElements.firstBox).first().should('not.exist');
});
