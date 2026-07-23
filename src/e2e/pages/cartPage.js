const { BasePage } = require('./basePage');
const { LOCATORS } = require('../constants/constants');

exports.CartPage = class CartPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async getCartItemCount(cartItemKey) {
            this.locator = await this.findValueOrLocatorFromTestData(cartItemKey, LOCATORS);
            return await this.page.locator(this.locator).count();
    }
}