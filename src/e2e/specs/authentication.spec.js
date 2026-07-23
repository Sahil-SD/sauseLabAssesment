//const { test, expect } = require('@playwright/test');
const { test } = require('../fixtures/fixture');
const { LoginPage } = require('../pages/loginPage');

test.describe('Authentication Testing', () => {

    test.beforeEach(async ({ loginPage, page }) => {
        await loginPage.visitUrl();
    });

    test('Valid Login - Standard User', async ({ loginPage, page }) => {
        // Login with standard user
        await loginPage.loginWithValidCred();
        // Verify successful login
        await loginPage.verifyAfterLoginPage();
    });

    test('Invalid Login - Wrong Credentials', async ({ loginPage, page }) => {
        // Attempt login with invalid credentials
        await loginPage.enterText('loginTd_invalidUser','loginTd_userName');
        await loginPage.enterText('loginTd_wrongPassword','loginTd_password');
        await loginPage.clickElement('loginTd_login');
        // Verify error message
        await loginPage.verifyVisibility('loginTd_credError');
    });

    test('Locked Out User Login', async ({ loginPage, page }) => {
        // Attempt login with locked out user
        await loginPage.enterText('loginTd_lockedOutUser','loginTd_userName');
        await loginPage.enterText('loginTd_pass','loginTd_password');
        await loginPage.clickElement('loginTd_login');
        
        // Verify locked out message
        await loginPage.verifyVisibility('loginTd_credError');
        await loginPage.verifyContainsText('loginTd_lockedOutMsg', 'loginTd_credError');
    });
});