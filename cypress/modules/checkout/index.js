export function proceedToCheckout() {
    cy.get('.check_out').click()
}

export function placeOrder(comment) {
    cy.get('textarea[name="message"]').type(comment)
    cy.get('a[href="/payment"]').click()
}

export function fillPaymentForm(name) {
    cy.get('[data-qa="name-on-card"]').type(name)
    cy.get('[data-qa="card-number"]').type('4111111111111111')
    cy.get('[data-qa="cvc"]').type('123')
    cy.get('[data-qa="expiry-month"]').type('12')
    cy.get('[data-qa="expiry-year"]').type('2030')
    cy.get('[data-qa="pay-button"]').click()
}
