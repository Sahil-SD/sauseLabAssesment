const { BasePage } = require('./basePage');

exports.LoginPage = class LoginPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async loginWithValidCred() {
        await this.enterText('loginTd_user','loginTd_userName');
        await this.enterText('loginTd_pass','loginTd_password');
        await this.clickElement('loginTd_login');
    }

    async verifyAfterLoginPage() {
        await this.verifyVisibility('productTd_inventoryContainer');
    }
}