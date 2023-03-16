export class OnlineShopPage {


    addProduct(product) {
        cy.get(`[value="${product}"]`).click()
    
    }

    closeModal(){
        cy.get('#closeModal').click()

    }

    clickShoppingCartButton(){
        cy.get('#goShoppingCart').click()

    }


}