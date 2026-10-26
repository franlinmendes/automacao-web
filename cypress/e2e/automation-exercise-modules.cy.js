/// <reference types="cypress" />

import { createUserData, getRandomEmail } from '../support/helpers'
import { goToLogin, goToProducts, goToCart, logout, deleteAccount } from '../modules/menu'
import { fillLoginForm } from '../modules/login'
import { fillSignupForm, fillAccountForm, registerUser } from '../modules/register'
import { viewFirstProduct, searchProduct, addProductToCart } from '../modules/products'
import { proceedToCheckout, placeOrder, fillPaymentForm } from '../modules/checkout'
import { subscribe } from '../modules/subscription'

describe('Automation Exercise', () => {
    let user

    beforeEach(() => {
        user = createUserData()
        cy.visit('/', { retryOnStatusCodeFailure: true })
        cy.get('#slider').should('be.visible')
    })

    it('Test Case 1: Register User', () => {
        goToLogin()
        cy.contains('h2', 'New User Signup!').should('be.visible')

        fillSignupForm(user.name, user.email)
        cy.contains('b', 'Enter Account Information').should('be.visible')

        fillAccountForm(user)
        cy.get('[data-qa="account-created"]').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
        cy.get('a > b').should('contain', user.name)

        deleteAccount()
        cy.get('[data-qa="account-deleted"]').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
    })

    it('Test Case 2: Login User with correct email and password', () => {
        registerUser(user)
        logout()

        goToLogin()
        cy.contains('h2', 'Login to your account').should('be.visible')

        fillLoginForm(user.email, user.password)
        cy.get('a > b').should('contain', user.name)

        deleteAccount()
        cy.get('[data-qa="account-deleted"]').should('be.visible')
    })

    it('Test Case 3: Login User with incorrect email and password', () => {
        goToLogin()
        cy.contains('h2', 'Login to your account').should('be.visible')

        fillLoginForm(getRandomEmail(), '123')
        cy.contains('Your email or password is incorrect!').should('be.visible')
    })

    it('Test Case 4: Logout User', () => {
        registerUser(user)
        logout()

        goToLogin()
        cy.contains('h2', 'Login to your account').should('be.visible')

        fillLoginForm(user.email, user.password)
        cy.get('a > b').should('contain', user.name)

        logout()
        cy.url().should('include', '/login')
        cy.contains('h2', 'Login to your account').should('be.visible')
    })

    it('Test Case 5: Register User with existing email', () => {
        registerUser(user)
        logout()

        goToLogin()
        cy.contains('h2', 'New User Signup!').should('be.visible')

        fillSignupForm(user.name, user.email)
        cy.get('form[action*=signup] p').should('be.visible').and('contain.text', 'Email Address already exist!')
    })

    it('Test Case 8: Verify All Products and product detail page', () => {
        goToProducts()
        cy.url().should('include', '/products')
        cy.contains('h2', 'All Products').should('be.visible')
        cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0)

        viewFirstProduct()
        cy.url().should('include', '/product_details/1')
        cy.get('.product-information h2').should('be.visible')
        cy.get('.product-information').should('contain', 'Category:')
            .and('contain', 'Rs.')
            .and('contain', 'Availability:')
            .and('contain', 'Condition:')
            .and('contain', 'Brand:')
    })

    it('Test Case 9: Search Product', () => {
        goToProducts()
        cy.url().should('include', '/products')
        cy.contains('h2', 'All Products').should('be.visible')

        searchProduct('Jeans')
        cy.contains('h2', 'Searched Products').should('be.visible')
        cy.get('.features_items .productinfo p').should('have.length.greaterThan', 0)
            .each(($product) => {
                expect($product.text().toLowerCase()).to.contain('jeans')
            })
    })

    it('Test Case 10: Verify Subscription in home page', () => {
        subscribe(user.email)
        cy.contains('h2', 'Subscription').should('be.visible')
        cy.get('#success-subscribe').should('be.visible').and('contain', 'You have been successfully subscribed!')
    })

    it('Test Case 15: Place Order: Register before Checkout', () => {
        registerUser(user)
        cy.get('a > b').should('contain', user.name)

        addProductToCart(1)
        addProductToCart(2)
        goToCart()
        cy.url().should('include', '/view_cart')
        cy.get('#cart_info_table tbody tr').should('have.length', 2)

        proceedToCheckout()
        cy.get('#address_delivery').should('contain', user.address).and('contain', user.city)
        cy.contains('h2', 'Review Your Order').should('be.visible')

        placeOrder('Order placed by automated test')
        fillPaymentForm(user.name)
        cy.get('[data-qa="order-placed"]').should('be.visible')
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')

        deleteAccount()
        cy.get('[data-qa="account-deleted"]').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
    })

    it('Test Case 16: Place Order: Login before Checkout', () => {
        registerUser(user)
        logout()

        goToLogin()
        fillLoginForm(user.email, user.password)
        cy.get('a > b').should('contain', user.name)

        addProductToCart(1)
        addProductToCart(2)
        goToCart()
        cy.url().should('include', '/view_cart')
        cy.get('#cart_info_table tbody tr').should('have.length', 2)

        proceedToCheckout()
        cy.get('#address_delivery').should('contain', user.address).and('contain', user.city)
        cy.contains('h2', 'Review Your Order').should('be.visible')

        placeOrder('Order placed by automated test')
        fillPaymentForm(user.name)
        cy.get('[data-qa="order-placed"]').should('be.visible')
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')

        deleteAccount()
        cy.get('[data-qa="account-deleted"]').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
    })
})
