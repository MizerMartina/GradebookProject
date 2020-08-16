export default class AuthPage {
    
    get signInLink () {
        return cy.get('.nav-link').contains('Sign in')
    }
    
    get registerLink () {
        return cy.get('.nav-link').contains('Register')
    }
    
    get email() {
        return cy.get('input[type=text]').should('have.class', 'form-control') //try with should('have.name', 'email') or should('have.attr', 'name', 'email')
    }

    get password() {
        return cy.get('input[type=password]').should('have.class', 'form-control')
    }

    get loginButton() {
        return cy.get('button[type=submit]').contains('Login')
    }

    get SignOutLink() {
        return cy.get('.nav-link').contains('Sign out')
    }
    
    login (emailPar, passwordPar) {
        this.email.type(emailPar)
        this.password.type(passwordPar)
        this.loginButton.click()
    }
}

export const authPage = new AuthPage()