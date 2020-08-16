import { EMAIL } from '../fixtures/constants';
import { authPage } from '../page_objects/sign-in.page';


beforeEach(() => {
    //starting page
    cy.visit('/');
    cy.server();

    cy.route('GET', Cypress.env('apiUrl') + '/diaries?page=1').as('homepage');



})
describe('Sign Out module', () => {
    it('TC-SO01 : Validate Signing Out user', () => {
        //checking if user is logged in
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/login');
        authPage.SignOutLink.should("not.be.visible");
        //loggin in
        authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD);
        cy.wait('@homepage');
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/gradebooks');
        //loggin out
        authPage.SignOutLink.should("be.visible");
        authPage.SignOutLink.click();
        //confirm user is not logged in
        cy.url().should("eq", 'https://gradebook.vivifyideas.com/login');
        authPage.SignOutLink.should("not.be.visible");
        authPage.signInLink.should('be.visible');
        authPage.registerLink.should('be.visible');
// loggin out snapshot has gradebook and Sign In and Register button => ? check it later
    })

})