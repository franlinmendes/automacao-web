const seletores = {
    title: 'h2',
    cartRows: '#cart_info_table tbody tr',
    proceedToCheckout: '.check_out',
    deliveryAddress: '#address_delivery',
    comment: 'textarea[name="message"]',
    placeOrder: 'a[href="/payment"]',
    nameOnCard: '[data-qa="name-on-card"]',
    cardNumber: '[data-qa="card-number"]',
    cvc: '[data-qa="cvc"]',
    expiryMonth: '[data-qa="expiry-month"]',
    expiryYear: '[data-qa="expiry-year"]',
    payButton: '[data-qa="pay-button"]',
    orderPlaced: '[data-qa="order-placed"]'
}

function proceedToCheckout() {
    cy.get(seletores.proceedToCheckout).click()
}

function placeOrder(comment) {
    cy.get(seletores.comment).type(comment)
    cy.get(seletores.placeOrder).click()
}

function fillPaymentForm(card) {
    cy.get(seletores.nameOnCard).type(card.name)
    cy.get(seletores.cardNumber).type(card.number)
    cy.get(seletores.cvc).type(card.cvc)
    cy.get(seletores.expiryMonth).type(card.month)
    cy.get(seletores.expiryYear).type(card.year)
    cy.get(seletores.payButton).click()
}

function validateCartItems(quantity) {
    cy.url().should('include', '/view_cart')
    cy.get(seletores.cartRows).should('have.length', quantity)
}

function validateAddressAndReview(user) {
    cy.get(seletores.deliveryAddress).should('contain', user.address).and('contain', user.city)
    cy.contains(seletores.title, 'Review Your Order').should('be.visible')
}

function validateOrderPlaced() {
    cy.get(seletores.orderPlaced).should('be.visible')
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
}

module.exports = {
    proceedToCheckout,
    placeOrder,
    fillPaymentForm,
    validateCartItems,
    validateAddressAndReview,
    validateOrderPlaced
}
