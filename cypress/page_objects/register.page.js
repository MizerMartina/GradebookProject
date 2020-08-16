export default class RegisterPage {

    get signInLink() {
        return cy.get('.nav-link').contains('Sign in')
    }

    get registerLink() {
        return cy.get('.nav-link').contains('Register')
    }

    get firstName() {
        return cy.get('#firstName')
    }

    get lastName() {
        return cy.get('#lastName')
    }

    get password() {
        return cy.get('#password')
    }

    get passwordConfirmation() {
        return cy.get('#passwordConfirmation')
    } 

    get email() {
        return cy.get('#email')
    }

    get termsAndConditions() {
        return cy.get('#termsAndConditions')
    }

    get submitButton() {
        return cy.get('button[type=submit]').contains('Submit')
    }

    get SignOutLink() {
        return cy.get('.nav-link').contains('Sign out')
    }

    register (firstNamePar, lastNamePar, passwordPar, emailPar) {
        this.firstName.type(firstNamePar);
        this.lastName.type(lastNamePar);
        this.password.type(passwordPar);
        this.passwordConfirmation.type(passwordPar);
        this.email.type(emailPar);
    }
}

export const registerPage = new RegisterPage()