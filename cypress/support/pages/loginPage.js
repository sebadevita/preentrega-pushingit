export class LoginPage {
    constructor() {
        this.userInput = '#user';
        this.passInput = '#pass';
        this.loginButton = 'Log in';
    }

    typeUser(user) {
        cy.get(this.userInput).type(user)
    };

    typePass(pass) {
        cy.get(this.passInput).type(pass)
    };

    clickLogIn() {
        cy.contains(this.loginButton).click()
    };
};