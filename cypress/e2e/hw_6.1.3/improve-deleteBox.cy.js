import cy from "cypress";
const generalElements = require("../../fixtures/pages/general.json");
const users = require("../../fixtures/users.json");

describe('Delete boxes', () => {
  beforeEach(() => {
    cy.login(users.userAutor.email, users.userAutor.password);
  });

  it('should successfully send DELETE request for each box', () => {
    cy.request({
      method: "GET",
      url: "https://staging.lpitko.ru/api/account/boxes/"
    }).then((response) => {
      expect(response.status).to.eq(200);

      const boxes = response.body;
      
      cy.wrap(boxes).each(box => {
        cy.request({
          method: "DELETE",
          url: `https://staging.lpitko.ru/api/account/box/${box.id}/`
        }).then(deleteResponse => {
          expect(deleteResponse.status).to.eq(200); 
        });
      });
    });
  });

  it('should successfully delete box from UI', () => {
    cy.contains("span", "Коробки").click(); 
    cy.get(generalElements.firstBox).first().click();
    cy.get(generalElements.toggleButton).click({ force: true });
    cy.contains("Архивация и удаление").click({ force: true });
    cy.get(generalElements.deleteBox).type("Удалить коробку");
    cy.get(generalElements.deleteButton).click({ force: true });
    cy.contains("span", "Коробки").click(); 
    cy.get(generalElements.firstBox).first().should('not.exist');
  });
});
