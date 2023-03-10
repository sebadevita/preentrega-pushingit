export class HomePage {
    clickOnlineShop() {
        cy.xpath('//a[@id="onlineshoplink"]').click()
    };
};