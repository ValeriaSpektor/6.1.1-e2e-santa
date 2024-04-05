// run_raffle_steps.js

const { Given, When, Then } = require('cypress-cucumber-preprocessor/steps');

Given('I am logged in as {string}', (user) => {
  const userData = require('../../fixtures/users.json')[user];
  cy.login(userData.email, userData.password);
});

When('I navigate to {string}', (page) => {
  // Implement navigation steps
});

When('I click on the box named {string}', (boxName) => {
  // Implement click on box steps
});

When('I click on {string}', (buttonName) => {
  // Implement click on button steps
});

When('I initiate the raffle', () => {
  // Implement raffle initiation steps
});

Then('I should see the message {string}', (message) => {
  // Implement assertion steps
});
