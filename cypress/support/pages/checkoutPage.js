export class CheckoutPage{

    constructor(){
        this.nameInput = '#FirstName'
        this.lastNameInput = '#lastName'
        this.cardInput = '#cardNumber'

    }
    
    
    typeName(name) {
        cy.get(this.nameInput).type(name);
    }
    
    typeLastName(lastName) {
        cy.get(this.lastNameInput).type(lastName);
    }

    typeCard(card) {
        cy.get(this.cardInput).type(card);
    }

    purchase(){
        cy.get('button').contains('Purchase').click()
    }

    returnCheckoutFullName(name, lastName){
        return cy.get('p').contains(`${name} ${lastName}`)
    }

    returnCheckoutCard(){
        return cy.get('#creditCard')
    }

    // returnCheckoutProducts(product){
    //     return cy.get('p').contains(product)
    // }
};