const { expect } = require("@playwright/test");
const { BasePage } = require('./basePage');

exports.ProductPage = class ProductPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async verifyShoppingCartCount(badgeLocatorKey, expectedCountKey) {
        const badgeLocator = await this.findValueOrLocatorFromTestData(badgeLocatorKey, "locators");
        const expectedCount = await this.findValueOrLocatorFromTestData(expectedCountKey, "data");
        const badgeElement = await this.page.locator(badgeLocator);
        expect(badgeElement).toHaveCount(expectedCount);
    }
}