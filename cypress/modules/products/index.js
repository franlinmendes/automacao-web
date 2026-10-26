export function viewFirstProduct() {
    cy.get('a[href="/product_details/1"]').click()
}

export function searchProduct(name) {
    cy.get('#search_product').type(name)
    cy.get('#submit_search').click()
}

export function addProductToCart(productId) {
    cy.get(`.features_items .productinfo [data-product-id="${productId}"]`).click()
    cy.get('#cartModal').should('be.visible')
    cy.get('.close-modal').click()
}
