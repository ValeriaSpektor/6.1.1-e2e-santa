// run_raffle_steps.js

const { Given, When, Then, And } = require("cypress-cucumber-preprocessor/steps");
const users = require("../../users.json");
const boxPage = require("../../fixtures/pages/boxPage.json");
const generalElements = require("../../fixtures/pages/general.json");
const dashboardPage = require("../../fixtures/pages/dashboardPage.json");
const invitePage = require("../../fixtures/pages/invitePage.json");
const inviteeBoxPage = require("../../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../../fixtures/pages/inviteeDashboardPage.json");
import { faker } from "@faker-js/faker";

let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
let maxAmount = 150;
let currency = "Евро";
let inviteLink;

Given('the user is logged in', () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
});

When('the user creates a box with the name {string}', (boxName) => {
    cy.contains("Создать коробку").click();
    cy.get(boxPage.boxNameField).type(newBoxName);
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.sixthIcon).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.giftPriceToggle).check({force: true});
    cy.get(boxPage.maxAnount).type(maxAmount);
    cy.get(boxPage.currency).select(currency);
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
});

And('adds participants', () => {
    cy.get(generalElements.addParticipants).click({force: true});
    cy.get(invitePage.inviteLink)
        .invoke("text")
        .then((link) => {
            inviteLink = link;
        });
    cy.clearCookies();
});

And('adds users', () => {
    cy.approveAsUser(users.user1, wishes);
    cy.approveAsUser(users.user2, wishes);
    cy.approveAsUser(users.user3, wishes);
});

Then('the box is successfully created', () => {
    cy.get(dashboardPage.createdBoxName).should("have.text", newBoxName);
    cy.get(".layout-1__header-wrapper-fixed .toggle-menu-item span")
        .invoke("text")
        .then((text) => {
            expect(text).to.include("Участники");
            expect(text).to.include("Моя карточка");
            expect(text).to.include("Подопечный");
        });
});

Given('the user is logged in', () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
});

When('When the user navigates to the box and adds participants manually', () => {
    cy.contains('span.txt--med.txt', 'Коробки').click({ force: true });
    cy.get(generalElements.firstBox).first().click();
    cy.get(generalElements.toggleButton).click({ force: true });
    cy.contains('span.txt--med.txt', 'Добавить участников').click({ force: true });
    cy.get(generalElements.nameParticipants).type(users.user1.name);
    cy.get(generalElements.emailParticipants).type(users.user1.email);
});

Then('participants are successfully added', () => {
    cy.get('.form-page__buttons > .btn-main').click();
    cy.contains("Назад к коробке").should("exist");
});

Given('the user is logged in', () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
});

When('the user conducts a prize drawing', () => {
    cy.contains("Быстрая жеребьевка").click();
    cy.get(generalElements.arrowRight).click();
    cy.get(':nth-child(3) > .frm-wrapper > #input-table-0').type(users.user1.name);
    cy.get(':nth-child(4) > .frm-wrapper > #input-table-0').type(users.user1.email);
    cy.get(':nth-child(5) > .frm-wrapper > #input-table-0').type(users.user2.name);
    cy.get(':nth-child(6) > .frm-wrapper > #input-table-0').type(users.user2.email);
    cy.get(':nth-child(7) > .frm-wrapper > #input-table-0').type(users.user3.name);
    cy.get(':nth-child(8) > .frm-wrapper > #input-table-0').type(users.user3.email);
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
});

Then('the drawing is successfully completed', () => {
    cy.contains("Жеребьевка проведена!").should("exist");
});

Given('the user is logged in', () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
});

When('the user deletes the box', () => {
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

Then('the box is successfully deleted', () => {
    cy.log('No boxes found to delete.');
});
