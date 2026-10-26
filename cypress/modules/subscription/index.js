export function subscribe(email) {
    cy.get('#footer').scrollIntoView()
    cy.get('#susbscribe_email').type(email)
    cy.get('#subscribe').click()
}
