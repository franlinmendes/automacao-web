function getRandomEmail() {
    return `e2eclasses-${Date.now()}@gmail.com`
}

function createUserData() {
    return {
        name: 'E2E Classes',
        email: getRandomEmail(),
        password: '12345',
        firstName: 'E2E',
        lastName: 'Classes',
        company: 'Test',
        address: 'Test addrs',
        address2: 'Addres 2',
        country: 'United States',
        state: 'Florida',
        city: 'Miami',
        zipcode: '12345',
        mobileNumber: '12345678'
    }
}

function createCardData(name) {
    return {
        name,
        number: '4111111111111111',
        cvc: '123',
        month: '12',
        year: '2030'
    }
}

module.exports = { getRandomEmail, createUserData, createCardData }
