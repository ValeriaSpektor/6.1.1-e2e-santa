const users = require("../../fixtures\\users.json");


describe("Run raffle", () => {
  it("run raffle", () => {
    const newBoxName = "Zvezda"; 
    cy.visit("/login");
    cy.get('input[name="email"]').type(users.userAutor.email); // Замените users.userAutor.email на нужный адрес электронной почты
    cy.get('input[name="password"]').type(users.userAutor.password); // Замените users.userAutor.password на нужный пароль
    cy.get('[data-cy="submitButton"]').click({ force: true }); // Попробуйте использовать { force: true } если кнопка вызывает проблемы
    cy.contains("Моя коробка").click();
    cy.contains(newBoxName).click(); 
    cy.contains("Жеребьевка").click(); 
    cy.contains("Провести жеребьевку").click();
    cy.contains("Да, провести жеребьевку").click(); 
    cy.contains("Жеребьевка проведена").should("exist"); 
  });
});
