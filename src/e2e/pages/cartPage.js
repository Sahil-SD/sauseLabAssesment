const { expect } = require('@playwright/test');
const { BasePage } = require('./basePage');
const { LOCATORS, DATA } = require('../constants/constants');

exports.CartPage = class CartPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async getCartItemCount(cartItemKey) {
            this.locator = await this.findValueOrLocatorFromTestData(cartItemKey, LOCATORS);
            return await this.page.locator(this.locator).count();
    }

    async verifyCartItemNotEmpty(expectedCountKey) {
        try{
            const expectedCount = await this.findValueOrLocatorFromTestData(expectedCountKey, DATA);
            const cartCount = await this.getCartItemCount('productTd_cartItem');
            await expect(cartCount).toBeGreaterThan(0);
            await expect(cartCount).toEqual(expectedCount);
        } catch(error) {
            logger.error(`Error while asserting count Error: ${error.message}`);
            throw error;
        }

    }
}