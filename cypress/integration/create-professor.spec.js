import { EMAIL } from '../fixtures/constants';
import { authPage } from '../page_objects/sign-in.page';
import { userPage } from '../page_objects/homepage.page';


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
    //going to the Create Professor page
    userPage.professors.click();
    userPage.createProfessor.click();
    cy.url().should("eq", 'https://gradebook.vivifyideas.com/create-professor');



})
describe('Create gradebook', () => {
    it('TC-CP01 : Validate Create professor page', () => {
        //header
        userPage.gradebooks.should('be.visible');
        userPage.myGradebook.should('be.visible');
        userPage.createGradebook.should('be.visible');
        userPage.professors.click().should('be.visible');
        userPage.allProfessors.should('be.visible');
        userPage.createProfessor.should('be.visible');
        authPage.SignOutLink.should('be.visible');
        //main
        cy.get('h3').contains('Create Professor');
        userPage.firstName.should('be.visible');
        userPage.lastName.should('be.visible');
        userPage.addImageButton.click().should('be.visible');
        userPage.addImageInput.should('be.visible');
    })

})