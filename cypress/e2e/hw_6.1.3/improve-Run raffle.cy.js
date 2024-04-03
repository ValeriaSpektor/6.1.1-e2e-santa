const loginToAccount = (email, password) => {
  cy.login(email, password);
};


describe("Run raffle", () => {
  const { email, password } = users.userAutor;
  const newBoxName = "Zvezda";

  beforeEach(() => {
    loginToAccount(email, password);
  });

  it("should successfully run raffle", () => {
    cy.contains("Моя коробка").click();
    cy.contains(newBoxName).click();
    cy.contains("Жеребьевка").click();
    cy.contains("Провести жеребьевку").click();
    cy.contains("Да, провести жеребьевку").click();
    cy.contains("Жеребьевка проведена").should("exist");
  });
});
