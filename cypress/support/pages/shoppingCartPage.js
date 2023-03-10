export class ShoppingCartPage {
    clickShowTotalPrice() {
        cy.xpath('//button').contains('Show total price').click()

    }

    returnProductPrice(product){
        const productPrice = cy.get('p').contains(product).siblings('p#productPrice')
        return productPrice
    }

    returnTotalPrice(){
        return cy.get('#price')
    }

}