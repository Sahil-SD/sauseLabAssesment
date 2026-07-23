const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

test.describe('Authentication Testing', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.visitUrl();
    });

    test('Valid Login - Standard User', async ({ page }) => {
        // Login with standard user
        await loginPage.loginWithValidCred();
        // Verify successful login
        await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
    });

    test('Invalid Login - Wrong Credentials', async ({ page }) => {
        // Attempt login with invalid credentials
        await loginPage.enterText('loginTd_invalidUser','loginTd_userName');
        await loginPage.enterText('loginTd_wrongPassword','loginTd_password');
        await loginPage.clickElement('loginTd_login');
        // Verify error message
        await expect(page.locator('[data-test="error"]')).toBeVisible();
    });

    test('Locked Out User Login', async ({ page }) => {
        // Attempt login with locked out user
//        await page.fill('[data-test="username"]', 'locked_out_user');
        await loginPage.enterText('loginTd_lockedOutUser','loginTd_userName');
        await loginPage.enterText('loginTd_pass','loginTd_password');
        await loginPage.clickElement('loginTd_login');
        
        // Verify locked out message
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out');
    });
});