const { goToLogin } = require('../menu')

const seletores = {
    title: 'h2',
    accountInfoTitle: 'b',
    signupName: '[data-qa="signup-name"]',
    signupEmail: '[data-qa="signup-email"]',
    signupButton: '[data-qa="signup-button"]',
    gender: '#id_gender1',
    password: '[data-qa="password"]',
    days: '[data-qa="days"]',
    months: '[data-qa="months"]',
    years: '[data-qa="years"]',
    newsletter: '#newsletter',
    optin: '#optin',
    firstName: '[data-qa="first_name"]',
    lastName: '[data-qa="last_name"]',
    company: '[data-qa="company"]',
    address: '[data-qa="address"]',
    address2: '[data-qa="address2"]',
    country: '[data-qa="country"]',
    state: '[data-qa="state"]',
    city: '[data-qa="city"]',
    zipcode: '[data-qa="zipcode"]',
    mobileNumber: '[data-qa="mobile_number"]',
    createAccount: '[data-qa="create-account"]',
    accountCreated: '[data-qa="account-created"]',
    continueButton: '[data-qa="continue-button"]'
}

function fillSignupForm(name, email) {
    cy.get(seletores.signupName).type(name)
    cy.get(seletores.signupEmail).type(email)
    cy.get(seletores.signupButton).click()
}

function fillAccountForm(user) {
    cy.get(seletores.gender).check()
    cy.get(seletores.password).type(user.password)
    cy.get(seletores.days).select('1')
    cy.get(seletores.months).select('September')
    cy.get(seletores.years).select('1990')
    cy.get(seletores.newsletter).check()
    cy.get(seletores.optin).check()

    cy.get(seletores.firstName).type(user.firstName)
    cy.get(seletores.lastName).type(user.lastName)
    cy.get(seletores.company).type(user.company)
    cy.get(seletores.address).type(user.address)
    cy.get(seletores.address2).type(user.address2)
    cy.get(seletores.country).select(user.country)
    cy.get(seletores.state).type(user.state)
    cy.get(seletores.city).type(user.city)
    cy.get(seletores.zipcode).type(user.zipcode)
    cy.get(seletores.mobileNumber).type(user.mobileNumber)
    cy.get(seletores.createAccount).click()
}

function validateSignupPageVisible() {
    cy.contains(seletores.title, 'New User Signup!').should('be.visible')
}

function validateAccountInfoPageVisible() {
    cy.contains(seletores.accountInfoTitle, 'Enter Account Information').should('be.visible')
}

function validateAccountCreated() {
    cy.get(seletores.accountCreated).should('be.visible')
    cy.get(seletores.continueButton).click()
}

function validateEmailAlreadyExists() {
    cy.contains('Email Address already exist!').should('be.visible')
}

function registerUser(user) {
    goToLogin()
    fillSignupForm(user.name, user.email)
    fillAccountForm(user)
    validateAccountCreated()
}

module.exports = {
    fillSignupForm,
    fillAccountForm,
    validateSignupPageVisible,
    validateAccountInfoPageVisible,
    validateAccountCreated,
    validateEmailAlreadyExists,
    registerUser
}
