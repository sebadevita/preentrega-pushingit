export class ShoppingCartPage {
    clickShowTotalPrice() {
        cy.xpath('//button').contains('Show total price').click()

    }
    
    returnProductName(product){
        return cy.get('p').contains(product)
    }

    returnProductPrice(product){
        return cy.get('p').contains(product).siblings('p#productPrice')
    }

    returnTotalPrice(){
        return cy.get('#price')
    }

    goToCheckout(){
        cy.get('button').contains('Go to Checkout').click()
    }

}