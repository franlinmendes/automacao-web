const seletores = {
    title: 'h2',
    productCards: '.features_items .product-image-wrapper',
    productNames: '.features_items .productinfo p',
    firstProductLink: 'a[href="/product_details/1"]',
    productInformation: '.product-information',
    productName: '.product-information h2',
    searchInput: '#search_product',
    searchButton: '#submit_search',
    addToCart: (productId) => `.features_items .productinfo [data-product-id="${productId}"]`,
    cartModal: '#cartModal',
    closeModal: '.close-modal'
}

function viewFirstProduct() {
    cy.get(seletores.firstProductLink).click()
}

function searchProduct(name) {
    cy.get(seletores.searchInput).type(name)
    cy.get(seletores.searchButton).click()
}

function addProductToCart(productId) {
    cy.get(seletores.addToCart(productId)).click()
    cy.get(seletores.cartModal).should('be.visible')
    cy.get(seletores.closeModal).click()
}

function validateAllProductsVisible() {
    cy.url().should('include', '/products')
    cy.contains(seletores.title, 'All Products').should('be.visible')
    cy.get(seletores.productCards).should('have.length.greaterThan', 0)
}

function validateProductDetails() {
    cy.url().should('include', '/product_details/1')
    cy.get(seletores.productName).should('be.visible')
    cy.get(seletores.productInformation)
        .should('contain', 'Category:')
        .and('contain', 'Rs.')
        .and('contain', 'Availability:')
        .and('contain', 'Condition:')
        .and('contain', 'Brand:')
}

function validateSearchResults(name) {
    cy.contains(seletores.title, 'Searched Products').should('be.visible')
    cy.get(seletores.productNames)
        .should('have.length.greaterThan', 0)
        .each(($product) => {
            expect($product.text().toLowerCase()).to.contain(name.toLowerCase())
        })
}

module.exports = {
    viewFirstProduct,
    searchProduct,
    addProductToCart,
    validateAllProductsVisible,
    validateProductDetails,
    validateSearchResults
}
