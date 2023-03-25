/// <reference types="cypress" />
import {RegisterPage} from '../support/pages/registerPage'
import {LoginPage} from '../support/pages/loginPage'
import {HomePage} from '../support/pages/homePage'
import {OnlineShopPage} from '../support/pages/onlineShopPage'
import {ShoppingCartPage} from '../support/pages/shoppingCartPage'

describe('Entrega final', () => { 
    let productsData
    let checkoutData
    const registerPage = new RegisterPage()
    const loginPage = new LoginPage()
    const homePage = new HomePage()
    const onlineShopPage = new OnlineShopPage()
    const shoppingCartPage = new ShoppingCartPage()
    
    before('Before', () => {
        cy.fixture("productsFixture").then(data => { productsData = data})
        cy.fixture("checkoutFixture").then(data => { checkoutData = data})

        const username = "sebita"
        const password = "123456!"
        const gender = "Masculino"
        const day = "5"
        const month = "December"
        const year = "1996"

        cy.request({
            url: 'https://pushing-it.onrender.com/api/register',
            method: 'POST',
            body: {
                username : username,
                password : password,
                gender : gender,
                day : day,
                month : month,
                year : year
            }
        }).then(response => {
            expect(response.status).equal(200)
            expect(response.body.newUser.username).equal(username)

            cy.request({
                url: 'https://pushing-it.onrender.com/api/login',
                method: 'POST',
                body: {
                    username: username,
                    password: password
                }
            }).then(response => {
                expect(response.status).equal(200)
                expect(response.body.user.username).equal(username)})
                window.localStorage.setItem("token", response.body.token)
                window.localStorage.setItem("username", response.body.newUser.username)
            })

    })

        it('Realizar compra de 2 productos', () => {
            cy.visit('/')

            homePage.clickOnlineShop()
        
            onlineShopPage.addProduct(productsData.products.whitePants)
            onlineShopPage.closeModal()
            onlineShopPage.addProduct(productsData.products.redCap)
            onlineShopPage.closeModal()
            onlineShopPage.clickShoppingCartButton()
        
            shoppingCartPage.returnProductName(productsData.products.redCap).should('have.text', productsData.products.redCap)
            shoppingCartPage.returnProductName(productsData.products.whitePants).should('have.text', productsData.products.whitePants)
        
            shoppingCartPage.returnProductPrice(productsData.products.whitePants).should('have.text', `$${productsData.products.priceWhitePants}`)
            shoppingCartPage.returnProductPrice(productsData.products.redCap).should('have.text', `$${productsData.products.priceRedCap}`)
            shoppingCartPage.clickShowTotalPrice()   
            
            shoppingCartPage.returnTotalPrice().should('have.text', `${productsData.products.priceRedCap + productsData.products.priceWhitePants}`)

    
    })

    after('After', () =>{
        const username = window.localStorage.getItem("username")
        cy.request({
            url: `https://pushing-it.onrender.com/api/deleteuser/${username}`,
            method: "DELETE",
        }).then((response) => {
          expect(response.status).equal(200);
          expect(response.body.user.username).equal(username);
        })
        
        window.localStorage.clear()
    })
})

   
