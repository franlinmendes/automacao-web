const seletores = {
    title: 'h2',
    email: '[data-qa="login-email"]',
    password: '[data-qa="login-password"]',
    loginButton: '[data-qa="login-button"]'
}

function fillLoginForm(email, password) {
    cy.get(seletores.email).type(email)
    cy.get(seletores.password).type(password)
    cy.get(seletores.loginButton).click()
}

function validateLoginPageVisible() {
    cy.url().should('include', '/login')
    cy.contains(seletores.title, 'Login to your account').should('be.visible')
}

function validateInvalidLoginMessage() {
    cy.contains('Your email or password is incorrect!').should('be.visible')
}

module.exports = { fillLoginForm, validateLoginPageVisible, validateInvalidLoginMessage }
