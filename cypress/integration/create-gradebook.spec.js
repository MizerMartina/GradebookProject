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
    //going to the Create Gradebook page
    userPage.createGradebook.click();
    cy.url().should("eq", 'https://gradebook.vivifyideas.com/create-gradebook');



})
describe('Create gradebook', () => {
    it('TC-CG01 : Validate Create Gradebook page', () => {
        //header
        userPage.gradebooks.should('be.visible');
        userPage.myGradebook.should('be.visible');
        userPage.createGradebook.should('be.visible');
        userPage.professors.click().should('be.visible');
        userPage.allProfessors.should('be.visible');
        userPage.createProfessor.should('be.visible');
        authPage.SignOutLink.should('be.visible');
        //main
        cy.get('h3').contains('Create Gradebook Page');
        userPage.gradebookTitleInput.should('be.visible');
        userPage.selectProfessor.should('be.visible');
        userPage.submitButton.should('be.visible');
    })

    it('TC-CG06 : Create Gradebook with valid name and valid professor', () => {

        userPage.createGradebookFunction ('test', '119') // my ID is 119 from test@test.com 123456mS, figure out a way to make it dynamic
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/gradebooks');
        userPage.myGradebook.click();
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/my-gradebook/119');
    
    })

    
    it.only('TC-CG02 : Create Gradebook with blank name and blank professor', () => {

        userPage.gradebookTitleInput.clear();
        //userPage.selectProfessor.clear(); 
        userPage.submitButton.click().then(($input) => {
            expect('div.alert-danger').to.exist;
        }    )    
    
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/create-gradebook');
        

    })



    
})