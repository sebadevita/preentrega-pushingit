/// <reference types="cypress" />
import {RegisterPage} from '../support/pages/registerPage'
import {LoginPage} from '../support/pages/loginPage'
import {HomePage} from '../support/pages/homePage'
import {OnlineShopPage} from '../support/pages/onlineShopPage'
import {ShoppingCartPage} from '../support/pages/shoppingCartPage'

describe('Preentrega', () => { 
    let testData
    const registerPage = new RegisterPage()
    const loginPage = new LoginPage()
    const homePage = new HomePage()
    const onlineShopPage = new OnlineShopPage()
    const shoppingCartPage = new ShoppingCartPage()
    
    before('Before', () => {
        cy.fixture("desafio3Fixture").then(data => { testData = data})
    })

    it('Verificar precio indiviudal y total de 2 productos del carrito', () => {
    
    cy.visit('/')

    registerPage.dblClickIniciaSesion()
    loginPage.typeUser(testData.login.user)
    loginPage.typePass(testData.login.pass)
    loginPage.clickLogIn()
    homePage.clickOnlineShop()

    onlineShopPage.addProduct(testData.products.whitePants)
    onlineShopPage.closeModal()
    onlineShopPage.addProduct(testData.products.redCap)
    onlineShopPage.closeModal()
    onlineShopPage.clickShoppingCartButton()

    const number = 1

    shoppingCartPage.returnProductPrice(testData.products.whitePants).should('have.text', `$${testData.products.priceWhitePants}`)
    shoppingCartPage.returnProductPrice(testData.products.redCap).should('have.text', `$${testData.products.priceRedCap}`)
    shoppingCartPage.clickShowTotalPrice()   
    
    shoppingCartPage.returnTotalPrice().should('have.text', `${testData.products.priceRedCap + testData.products.priceWhitePants}`)
})})
