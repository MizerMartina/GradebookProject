import { EMAIL } from '../fixtures/constants';
import { authPage } from '../page_objects/sign-in.page';
import { userPage } from '../page_objects/homepage.page';

const faker = require("faker");
var randomFirstName = faker.name.firstName();
var randomLastName = faker.name.lastName();

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
    //going to the My Gradebook page
    userPage.myGradebook.click();
    cy.url().should("include", 'https://gradebook.vivifyideas.com/my-gradebook/');



})
describe('Create gradebook', () => {
    it('TC-MG01 : Validate My Gradebook page (with Gradebook created)', () => {
        //header
        userPage.gradebooks.should('be.visible');
        userPage.myGradebook.should('be.visible');
        userPage.createGradebook.should('be.visible');
        userPage.professors.click().should('be.visible');
        userPage.allProfessors.should('be.visible');
        userPage.createProfessor.should('be.visible');
        authPage.SignOutLink.should('be.visible');
        //main
        cy.get('h3').contains('My Gradebook Page');
        userPage.addStudentBtn.should('be.visible');
        userPage.deleteGradebookBtn.should('be.visible');
        userPage.editGradebookBtn.should('be.visible');
        //comment
        userPage.inputComment.should('be.visible');
        userPage.submitCommentBtn.should('be.visible');

    })


    it('TC-MG02 : Validate Add Student', () => {

        //add student
        userPage.addStudentBtn.click();
        cy.url().should("include", 'https://gradebook.vivifyideas.com/my-gradebook/add-student');
        userPage.addStudentWPicFunction(randomFirstName, randomLastName, 'https://pbs.twimg.com/profile_images/637300506768089089/gBjzfiDe_400x400.png');
        cy.url().should("include", 'https://gradebook.vivifyideas.com/single-gradebook/');
        //verifying that the student is added
        cy.get('table.table tbody tr td').should(($ul) => {
            expect($ul.last()).to.contain(`${randomFirstName} ${randomLastName}`)
        })

    })

    it('TC-MG06 : Validate write comment', () => {
        userPage.inputComment.type('I won\'t write comment!');
        userPage.submitCommentBtn.click();
        // verify that the comment is actually written
        cy.get('div.comments-box div').should(($comment) => {
            expect($comment.last()).to.contain('I won\'t write comment!')
        })
        // for some jdnfks reason there isn't gradebook showing after commenting -> ??????

    })

    it('TC-MG07 : Validate delete my comment on my gradebook', () => {

        userPage.deleteCommentBtn.should('be.visible');
        userPage.deleteCommentBtn.click();

        //It works but it's not the way it's supposed to be -> rework when you have time

    })

    /*it('TC-MG04 : Validate Delete Gradebook', () => {

        userPage.deleteGradebookBtn.should('be.visible');
        userPage.deleteGradebookBtn.click();

        //Finish when yo have time, rework the idea

    })*/


})