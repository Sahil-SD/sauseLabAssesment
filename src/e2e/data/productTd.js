module.exports = {
    locators: [
        {'key': 'cartBagPack', 'value': '[data-test="add-to-cart-sauce-labs-backpack"]'},
        {'key': 'cartBikeLight', 'value': '[data-test="add-to-cart-sauce-labs-bike-light"]'},
        {'key': 'cartTshirt', 'value': '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]'},
        {'key': 'cartItem', 'value': '.cart_item'},
        {'key': 'removeBagPack', 'value': '[data-test="remove-sauce-labs-backpack"]'},
        {'key': 'removeBikeLight', 'value': '[data-test="remove-sauce-labs-bike-light"]'},
        {'key': 'inventoryContainer', 'value': '[data-test="inventory-container"]'},
        {'key': 'shoppingCartBadge', 'value': '.shopping_cart_badge'},
    ],

    data: [
        {'key': 'shoppingCartBadgeEmptyCount', 'value': 0},
    ],
};
