//const { test, expect } = require('@playwright/test');
const { test, expect } = require('../fixtures/fixture');
const {LoginPage}= require('../pages/loginPage');

//test('has title', async ({ page }) => {
//  let loginPage=new LoginPage(page);
//  await loginPage.visitUrl();
//
// // Expect a title "to contain" a substring.
//  await loginPage.verifyTitle('loginTd_titleValue');
//});
//
//test('login to portal', async ({ page }) => {
//  let loginPage=new LoginPage(page);
//  await loginPage.visitUrl();
//  await loginPage.loginWithValidCred();
//});

test('has title', async ({ loginPage }) => {
//  let loginPage=new LoginPage(page);
  await loginPage.visitUrl();

 // Expect a title "to contain" a substring.
  await loginPage.verifyTitle('loginTd_titleValue');
});

test('login to portal', async ({ loginPage }) => {
//  let loginPage=new LoginPage(page);
  await loginPage.visitUrl();
  await loginPage.loginWithValidCred();
});