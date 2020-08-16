/// <reference types="cypress"/>
import { authPage } from '../page_objects/sign-in.page';
import { EMAIL } from '../fixtures/constants';

const faker = require("faker");
var randomEmail = faker.internet.email();
var randomPassword = faker.internet.password();

beforeEach(() => {
    //starting page
    cy.visit('/');
    cy.server();

    cy.route('GET', Cypress.env('apiUrl') + '/diaries?page=1').as('homepage');
})

describe('Sign in module', () => {
    it('TC-02S : Verify Sign in page layout', () => {
        authPage.signInLink.click();
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/login');
        authPage.signInLink.should('be.visible');
        authPage.registerLink.should('be.visible');
        cy.get('.form-signin-heading').contains('Please login').should('be.visible');
        authPage.email.should("be.visible");
        authPage.password.should("be.visible");
        authPage.loginButton.should("be.visible");
    })

    it('TC-03S : Sign in with valid email and valid password', () => {
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/login');
        authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD);
        cy.wait('@homepage');
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/gradebooks');
        authPage.SignOutLink.should("be.visible");
    })

    it('TC-04S : Sign in with valid email and invalid password', () => {
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/login');
        authPage.email.type(EMAIL.EXISTING);
        authPage.password.type(randomPassword)
        authPage.loginButton.click();
        authPage.password.then(($input) => {
            expect($input[0].validationMessage).to.eq('Bad credentials.')
        })
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/login');
        authPage.SignOutLink.should("not.be.visible");

    })

    it('TC-05S : Sign in with invalid email and valid password', () => {
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/login');
        authPage.email.type(randomEmail);
        authPage.password.type(EMAIL.PASSWORD)
        authPage.loginButton.click();
        authPage.email.then(($input) => {
            expect($input[0].validationMessage).to.eq('Bad credentials.')
        })
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/login');
        authPage.SignOutLink.should("not.be.visible");

    })

    it('TC-06S : Sign in with invalid email and invalid password', () => {
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/login');
        authPage.email.type(randomEmail);
        authPage.password.type(randomPassword)
        authPage.loginButton.click();
        authPage.email.then(($input) => {
            expect($input[0].validationMessage).to.eq('Bad credentials.')
        })
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/login');
        authPage.SignOutLink.should("not.be.visible");

    })

    it('TC-07S : Sign in with blank email and blank password', () => {
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/login');
        authPage.email.clear();
        authPage.email.should('have.value', ''); //try using type(); to wheather it will put an empty string *NOT WORKING*
        authPage.password.clear();
        authPage.password.should('have.value', '');
        authPage.loginButton.click();
        authPage.email.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/login');
        authPage.SignOutLink.should("not.be.visible");

    })

    it('TC-08S : Sign in with valid email and blank password', () => {
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/login');
        authPage.email.type(EMAIL.EXISTING);
        authPage.password.clear();
        authPage.password.should('have.value', '');
        authPage.loginButton.click();
        authPage.password.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/login');
        authPage.SignOutLink.should("not.be.visible");

    })

    it('TC-09S : Sign in with blank email and valid password', () => {
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/login');
        authPage.email.clear();
        authPage.email.should('have.value', '');
        authPage.password.type(EMAIL.PASSWORD);
        authPage.loginButton.click();
        authPage.email.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/login');
        authPage.SignOutLink.should("not.be.visible");

    })

})