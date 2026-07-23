const { test: base, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { ProductPage } = require('../pages/productPage');
const { CartPage } = require('../pages/cartPage');

// Extend the base test with custom fixtures
const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
});

module.exports = { test, expect };