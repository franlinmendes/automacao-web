const seletores = {
    slider: '#slider',
    login: 'a[href="/login"]',
    products: 'a[href="/products"]',
    cart: '.shop-menu a[href="/view_cart"]',
    logout: 'a[href="/logout"]',
    deleteAccount: 'a[href="/delete_account"]',
    loggedUser: 'a > b',
    accountDeleted: '[data-qa="account-deleted"]',
    continueButton: '[data-qa="continue-button"]'
}

function visitHome() {
    cy.visit('/', { retryOnStatusCodeFailure: true })
    cy.get(seletores.slider).should('be.visible')
}

function goToLogin() {
    cy.get(seletores.login).click()
}

function goToProducts() {
    cy.get(seletores.products).click()
}

function goToCart() {
    cy.get(seletores.cart).click()
}

function logout() {
    cy.get(seletores.logout).click()
}

function deleteAccount() {
    cy.get(seletores.deleteAccount).click()
}

function validateLoggedInAs(name) {
    cy.get(seletores.loggedUser).should('contain', name)
}

function validateAccountDeleted() {
    cy.get(seletores.accountDeleted).should('be.visible')
    cy.get(seletores.continueButton).click()
}

module.exports = {
    visitHome,
    goToLogin,
    goToProducts,
    goToCart,
    logout,
    deleteAccount,
    validateLoggedInAs,
    validateAccountDeleted
}
