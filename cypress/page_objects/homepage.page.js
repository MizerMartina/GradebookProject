export default class UserPage {

    //pagination
    get nextButton() {
        return cy.get('button').contains('Next')
    }

    get previousButton() {
        return cy.get('button').contains('Previous')
    }

    //header links

    get gradebooks() {
        return cy.get('.nav-link').contains('Gradebooks')
    }

    get myGradebook() {
        return cy.get('.nav-link').contains('My Gradebook')
    }

    get createGradebook() {
        return cy.get('.nav-link').contains('Create Gradebook')
    }

    get professors() {
        return cy.get('.dropdown').contains('Professors')
    }

    get allProfessors() {
        return cy.get('.dropdown-item').contains('All Professors')
    }

    get createProfessor() {
        return cy.get('.dropdown-item').contains('Create Professor')
    }

    get SignOutLink() {
        return cy.get('.nav-link').contains('Sign out')
    }

    //search

    get searchInput() {
        return cy.get('input[type=text]')
    }

    get searchButton() {
        return cy.get('.btn').contains('Search')
    }

    //table

    get gradebookTable() {
        return cy.get('.table')
    }

    //Create Gradebook

    get gradebookTitleInput() {
        return cy.get('#title')
    }

    get selectProfessor() {
        return cy.get('#professor')
    }

    get submitButton() {
        return cy.get('.btn').contains('Submit')
    }

    //Create Professor

    get firstName() {
        return cy.get('#firstName')
    }

    get lastName() {
        return cy.get('#lastName')
    }

    get addImageButton() {
        return cy.get('.btn').contains('Add images')
    }

    get addImageInput() {
        return cy.get('input[name=image_NaN]')
    }

    //My gradebook with created gradebook

    get addStudentBtn() {
        return cy.get('.btn').contains('Add Student')
    }

    get editGradebookBtn() {
        return cy.get('.btn').contains('Edit Gradebook')
    }

    get deleteGradebookBtn() {
        return cy.get('button.btn').contains('Delete Gradebook')
    }

    //Comments

    get inputComment() {
        return cy.get('textarea.form-control')
    }

    get submitCommentBtn() {
        return cy.get('button.btn').contains('Submit Comment')
    }

    get deleteCommentBtn() {
        return cy.get('button.btn').contains('Delete')
    }

    

    createGradebookFunction (titlePar, professorPar) {
        this.gradebookTitleInput.type(titlePar)
        this.selectProfessor.select(professorPar).should('have.value', professorPar) //figure out a dynamic way to do this
        this.submitButton.click()
    }

    addStudentWPicFunction (firstNamePar, lastNamePar, imgPar) {
        this.firstName.type(firstNamePar);
        this.lastName.type(lastNamePar);
        this.addImageButton.click();
        this.addImageInput.type(imgPar);
        this.submitButton.click();
    }
    addStudentWOPicFunction (firstNamePar, lastNamePar, imgPar) {
        this.firstName.type(firstNamePar);
        this.lastName.type(lastNamePar);
        this.submitButton.click();
    }
    
}

export const userPage = new UserPage()