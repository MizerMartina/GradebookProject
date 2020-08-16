/// <reference types="cypress"/>
import { authPage } from '../page_objects/sign-in.page';
import { userPage } from '../page_objects/homepage.page';
import { EMAIL } from '../fixtures/constants';


beforeEach(() => {
    //starting page
    cy.visit('/');
    cy.server();

    cy.route('GET', Cypress.env('apiUrl') + '/diaries?page=1').as('homepage');
    //loggin' the user
    cy.url().should("eq", 'https://gradebook.vivifyideas.com/login');
    authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD);
    cy.wait('@homepage');
    cy.url().should("eq", 'https://gradebook.vivifyideas.com/gradebooks');
    authPage.SignOutLink.should("be.visible");

})

describe('Homepage module', () => {
    it('TC-01H : Validate Homepage', () => {
        //header
        userPage.gradebooks.should('be.visible');
        userPage.myGradebook.should('be.visible');
        userPage.createGradebook.should('be.visible');
        userPage.professors.click().should('be.visible');
        userPage.allProfessors.should('be.visible');
        userPage.createProfessor.should('be.visible');
        authPage.SignOutLink.should('be.visible');
        //search
        userPage.searchInput.should('be.visible');
        userPage.searchButton.should('be.visible');
        //table
        userPage.gradebookTable.should('be.visible');
        
        cy.scrollTo('bottom');
        //pagination
        userPage.nextButton.should('be.visible');
        userPage.previousButton.should('be.visible');

    })

})


