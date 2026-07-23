const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { ProductPage } = require('../pages/productPage');
const { CartPage } = require('../pages/cartPage');

test.describe('Shopping Cart Testing', () => {
    let loginPage, productPage, cartPage;

    test.beforeEach(async ({ page }) => {
        // Login using direct selectors
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);

        await loginPage.visitUrl();
        await loginPage.loginWithValidCred();
        await loginPage.verifyAfterLoginPage();
//        await productPage.verifyVisibility('productTd_inventoryContainer');
    });

    test('Add Items to Cart', async ({ page }, testInfo) => {
        // Add multiple items to cart
        await productPage.clickElement('productTd_cartBagPack');
        await productPage.clickElement('productTd_cartBikeLight');
        await productPage.clickElement('productTd_cartTshirt');

        // Verify cart badge
        await expect(page.locator('.shopping_cart_badge')).toBeVisible();
        await expect(page.locator('.shopping_cart_badge')).toHaveText(/\d+/);

        // Verify cart contents
        await productPage.clickElement('headerTd_cartIcon');
    const cartCount = await cartPage.getCartItemCount('productTd_cartItem');
    const retryCount = testInfo.retry;
    await expect(cartCount).toBeGreaterThan(0);
//    await expect(cartCount).toEqual(3);
    await expect(cartCount).toEqual(retryCount ? 3 : 2); // making flaky intentionally
    });

    test('Remove Items from Cart', async ({ page }) => {
        // Add item then remove from product page
        await productPage.clickElement('productTd_cartBagPack');
        await expect(page.locator('.shopping_cart_badge')).toBeVisible();
        await productPage.clickElement('productTd_removeBagPack');
        // badge may disappear when empty
        // Add item and remove from cart page
        await productPage.clickElement('productTd_cartBikeLight');
        await productPage.clickElement('headerTd_cartIcon');
        await productPage.clickElement('productTd_removeBikeLight');

        // Verify cart is empty (badge not visible)
        await productPage.verifyShoppingCartCount('productTd_shoppingCartBadge', 'productTd_shoppingCartBadgeEmptyCount');
    });

    test('Cart Persistence', async ({ page }) => {
        // Add items to cart
        await productPage.clickElement('productTd_cartBagPack');
        await productPage.clickElement('productTd_cartBikeLight');

        // Refresh page
        await productPage.reloadPage();

        // Verify items remain in cart
        await productPage.verifyVisibility('productTd_shoppingCartBadge');
        await productPage.clickElement('headerTd_cartIcon');
    const persistedCount = await page.locator('.cart_item').count();
    await expect(persistedCount).toBeGreaterThan(0);
    });
});