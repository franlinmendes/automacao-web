export function goToLogin() {
    cy.get('a[href="/login"]').click()
}

export function goToProducts() {
    cy.get('a[href="/products"]').click()
}

export function goToCart() {
    cy.get('.shop-menu a[href="/view_cart"]').click()
}

export function logout() {
    cy.get('a[href="/logout"]').click()
}

export function deleteAccount() {
    cy.get('a[href="/delete_account"]').click()
}
