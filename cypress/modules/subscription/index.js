const seletores = {
    footer: '#footer',
    title: '#footer h2',
    email: '#susbscribe_email',
    subscribeButton: '#subscribe',
    successMessage: '#success-subscribe'
}

function subscribe(email) {
    cy.get(seletores.footer).scrollIntoView()
    cy.get(seletores.email).type(email)
    cy.get(seletores.subscribeButton).click()
}

function validateSubscriptionSection() {
    cy.contains(seletores.title, 'Subscription').should('be.visible')
}

function validateSubscriptionSuccess() {
    cy.get(seletores.successMessage).should('be.visible').and('contain', 'You have been successfully subscribed!')
}

module.exports = { subscribe, validateSubscriptionSection, validateSubscriptionSuccess }
