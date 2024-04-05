// run_raffle_test.js

describe('Run Raffle', () => {
    it('should successfully run raffle', () => {
      cy.visit('/');
      cy.log('Test execution started');
  
      cy.fixture('users.json').then((userData) => {
        const { email, password } = userData.userAutor;
        
        cy.login(email, password);
  
        cy.contains('Моя коробка').click();
        cy.contains('Zvezda').click();
        cy.contains('Жеребьевка').click();
        cy.contains('Провести жеребьевку').click();
        cy.contains('Да, провести жеребьевку').click();
  
        cy.contains('Жеребьевка проведена').should('exist');
      });
    });
  });
  