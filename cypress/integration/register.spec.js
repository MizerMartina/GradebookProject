/// <reference types="cypress"/>
import { registerPage } from '../page_objects/register.page';
import { EMAIL } from '../fixtures/constants';

const faker = require("faker");
var randomFirstName = faker.name.firstName();
var randomLastName = faker.name.lastName();
// var randomEmail = faker.internet.email();
// var randomPassword = faker.internet.password();

beforeEach(() => {
    //starting page
    cy.visit('/');
    cy.server();
    registerPage.registerLink.click();
    cy.url().should("eq", 'https://gradebook.vivifyideas.com/register');

    cy.route('GET', Cypress.env('apiUrl') + '/diaries?page=1').as('homepage');
})

describe('Register module', () => {
    it('TC-02R : Load Register Page', () => {
        registerPage.signInLink.should('be.visible');
        registerPage.registerLink.should('be.visible');
        cy.get('h2').contains('Register').should('be.visible');
        registerPage.firstName.should('be.visible');
        registerPage.lastName.should('be.visible');
        registerPage.password.should('be.visible');
        registerPage.passwordConfirmation.should('be.visible');
        registerPage.email.should('be.visible');
        registerPage.termsAndConditions.should('be.visible');
        registerPage.submitButton.should('be.visible');
    })

    it('TC-03R : Register with valid credentials', () => {
        registerPage.firstName.type(randomFirstName);
        registerPage.lastName.type(randomLastName);
        registerPage.password.type(EMAIL.PASSWORD);
        registerPage.passwordConfirmation.type(EMAIL.PASSWORD);
        registerPage.email.type('test1@test.com');
        registerPage.termsAndConditions.check();
        registerPage.submitButton.click();
        cy.wait('@homepage');
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/gradebooks');
        registerPage.SignOutLink.should("be.visible");
    })

    it('TC-04R : Register with already existing email (same credentials)', () => {

        registerPage.register(randomFirstName, randomLastName, EMAIL.PASSWORD, 'twice@test.com');
        registerPage.termsAndConditions.check();
        registerPage.submitButton.click();
        cy.wait('@homepage');
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/gradebooks');
        registerPage.SignOutLink.should("be.visible");
        registerPage.SignOutLink.click();
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/login');
        registerPage.registerLink.click();
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/register');
        registerPage.register(randomFirstName, randomLastName, EMAIL.PASSWORD, 'twice@test.com');
        registerPage.termsAndConditions.check();
        registerPage.submitButton.click();
        registerPage.email.then(($input) => {
            expect($input[0].validationMessage).to.eq('Oops! A user with this email address already exists. Did you mean to login instead?')
        })
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/register');


        //using for loop the test passes but it should fail ^^ assertions missing??? -> try without for loop
    })
    it('TC-10R : Register with all blank input fields and unticked "Accept terms and conditions"', () => {
        registerPage.firstName.clear().should('have.value', '');
        registerPage.lastName.clear().should('have.value', '');
        registerPage.password.clear().should('have.value', '');
        registerPage.passwordConfirmation.clear().should('have.value', '');
        registerPage.email.clear().should('have.value', '');
        registerPage.termsAndConditions.uncheck();
        registerPage.submitButton.click();
        registerPage.firstName.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/register');

    })




})


