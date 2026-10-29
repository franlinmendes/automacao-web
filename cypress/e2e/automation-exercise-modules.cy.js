/// <reference types="cypress" />

const { createUserData, createCardData, getRandomEmail } = require('../support/helpers')
const { visitHome, goToLogin, goToProducts, goToCart, logout, deleteAccount, validateLoggedInAs, validateAccountDeleted } = require('../modules/menu')
const { fillLoginForm, validateLoginPageVisible, validateInvalidLoginMessage } = require('../modules/login')
const { fillSignupForm, fillAccountForm, validateSignupPageVisible, validateAccountInfoPageVisible, validateAccountCreated, validateEmailAlreadyExists, registerUser } = require('../modules/register')
const { viewFirstProduct, searchProduct, addProductToCart, validateAllProductsVisible, validateProductDetails, validateSearchResults } = require('../modules/products')
const { proceedToCheckout, placeOrder, fillPaymentForm, validateCartItems, validateAddressAndReview, validateOrderPlaced } = require('../modules/checkout')
const { subscribe, validateSubscriptionSection, validateSubscriptionSuccess } = require('../modules/subscription')

describe('Automation Exercise', () => {
    let user

    beforeEach(() => {
        user = createUserData()
        visitHome()
    })

    it('Test Case 1: Register a new user, see the user logged in and delete the account', () => {
        goToLogin()
        validateSignupPageVisible()

        fillSignupForm(user.name, user.email)
        validateAccountInfoPageVisible()

        fillAccountForm(user)
        validateAccountCreated()
        validateLoggedInAs(user.name)

        deleteAccount()
        validateAccountDeleted()
    })

    it('Test Case 2: Login with correct email and password, see the user logged in and delete the account', () => {
        registerUser(user)
        logout()

        goToLogin()
        validateLoginPageVisible()

        fillLoginForm(user.email, user.password)
        validateLoggedInAs(user.name)

        deleteAccount()
        validateAccountDeleted()
    })

    it('Test Case 3: Login with incorrect email and password and see the error message', () => {
        goToLogin()
        validateLoginPageVisible()

        fillLoginForm(getRandomEmail(), '123')
        validateInvalidLoginMessage()
    })

    it('Test Case 4: Logout the user and go back to the login page', () => {
        registerUser(user)
        logout()

        goToLogin()
        fillLoginForm(user.email, user.password)
        validateLoggedInAs(user.name)

        logout()
        validateLoginPageVisible()
    })

    it('Test Case 5: Register with an existing email and see the email already exists message', () => {
        registerUser(user)
        logout()

        goToLogin()
        validateSignupPageVisible()

        fillSignupForm(user.name, user.email)
        validateEmailAlreadyExists()
    })

    it('Test Case 8: Open all products and see the first product details', () => {
        goToProducts()
        validateAllProductsVisible()

        viewFirstProduct()
        validateProductDetails()
    })

    it('Test Case 9: Search a product and see only related products', () => {
        goToProducts()
        validateAllProductsVisible()

        searchProduct('Jeans')
        validateSearchResults('Jeans')
    })

    it('Test Case 10: Subscribe in the home page footer and see the success message', () => {
        validateSubscriptionSection()

        subscribe(user.email)
        validateSubscriptionSuccess()
    })

    it('Test Case 15: Register before checkout, place the order and delete the account', () => {
        registerUser(user)
        validateLoggedInAs(user.name)

        addProductToCart(1)
        addProductToCart(2)
        goToCart()
        validateCartItems(2)

        proceedToCheckout()
        validateAddressAndReview(user)

        placeOrder('Order placed by automated test')
        fillPaymentForm(createCardData(user.name))
        validateOrderPlaced()

        deleteAccount()
        validateAccountDeleted()
    })

    it('Test Case 16: Login before checkout, place the order and delete the account', () => {
        registerUser(user)
        logout()

        goToLogin()
        fillLoginForm(user.email, user.password)
        validateLoggedInAs(user.name)

        addProductToCart(1)
        addProductToCart(2)
        goToCart()
        validateCartItems(2)

        proceedToCheckout()
        validateAddressAndReview(user)

        placeOrder('Order placed by automated test')
        fillPaymentForm(createCardData(user.name))
        validateOrderPlaced()

        deleteAccount()
        validateAccountDeleted()
    })
})
