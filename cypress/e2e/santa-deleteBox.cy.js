describe("user can delete box using API", () => {
    it("delete box", () => {
      // Здесь можно вызвать API для удаления коробки
      cy.deleteBox("your_box_id");
    });
  });
  