//const { test, expect } = require('@playwright/test');
const { test } = require('../fixtures/fixture');
const {LoginPage}= require('../pages/loginPage');

test.describe('Login screen element rendering', () => {
    test.beforeEach(async ({ loginPage, page }) => {
       await loginPage.visitUrl();
    });
    test('has title', async ({ loginPage, page }) => {
     // Expect a title "to contain" a substring.
      await loginPage.verifyTitle('loginTd_titleValue');
    });

    test('login field presence', async ({ loginPage, page }) => {
      await loginPage.verifyVisibility('loginTd_userName');
      await loginPage.verifyVisibility('loginTd_password');
      await loginPage.verifyVisibility('loginTd_login');
    });
});
