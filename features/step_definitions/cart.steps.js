const { Given, When, Then } = require('@cucumber/cucumber');
const CartPage = require('../../pages/cart.page');

When('I add product {string} to the cart', async function (productName) {
  this.cartPage = new CartPage(this.page);
  await this.cartPage.addProductToCart(productName);
});

//añade múltiples productos al carrito
When('I add products to the cart:', async function (dataTable) {
  const productNames = dataTable.raw().flat(); // Convierte la tabla en una lista de productos
  this.cartPage = new CartPage(this.page);

  // Agregar el primer producto
  await this.cartPage.addProductToCart(productNames[0]);

  // Agregar productos adicionales usando addProductToCartAgain
  for (let i = 1; i < productNames.length; i++) {
    await this.cartPage.addProductToCartAgain(productNames[i]);
  }
});

Then('the cart should contain {string}', async function (productName) {
  this.cartPage = new CartPage(this.page);
  const products = await this.cartPage.getCartProducts();
  console.log('Products in cart:', products); // Depuración
  if (!products.includes(productName)) {
    throw new Error(`Expected cart to contain "${productName}", but it does not.`);
  }
});

Then('the cart should contain the following products:', async function (dataTable) {
  const expectedProducts = dataTable.raw().flat(); // Convierte la tabla en una lista de productos
  this.cartPage = new CartPage(this.page);
  const actualProducts = await this.cartPage.getCartProducts();
  console.log('Products in cart:', actualProducts); // Depuración
  for (const product of expectedProducts) {
    if (!actualProducts.includes(product)) {
      throw new Error(`Expected cart to contain "${product}", but it does not.`);
    }
  }
});

Then('the cart should not contain {string}', async function (productName) {
  this.cartPage = new CartPage(this.page);
  const products = await this.cartPage.getCartProducts();
  console.log('Products in cart after deletion:', products); // Depuración
  if (products.includes(productName)) {
    throw new Error(`Expected cart to not contain "${productName}", but it does.`);
  }
});

When('I remove product {string} from the cart', async function (productName) {
  this.cartPage = new CartPage(this.page);
  await this.cartPage.removeProductFromCart(productName);
});

Then('the cart total should be {int}', async function (expectedTotal) {
  this.cartPage = new CartPage(this.page);
  const total = await this.cartPage.getCartTotal();
  if (total !== expectedTotal) {
    throw new Error(`Expected cart total to be ${expectedTotal}, but got ${total}.`);
  }
});

Then('the cart total amount should be correct', async function () {
  this.cartPage = new CartPage(this.page);
  const actualTotal = await this.cartPage.getCartTotal();
  const expectedTotal = await this.cartPage.calculateExpectedTotal();
  console.log(`Expected total: ${expectedTotal}, Actual total: ${actualTotal}`); // Depuración
  if (actualTotal !== expectedTotal) {
    throw new Error(`Expected total to be ${expectedTotal}, but got ${actualTotal}.`);
  }
});

Then('the cart should show quantity {int} for {string}', async function (quantity, productName) {
  this.cartPage = new CartPage(this.page);
  const actualQuantity = await this.cartPage.getProductQuantity(productName);
  if (actualQuantity !== quantity) {
    throw new Error(`Expected quantity ${quantity} for "${productName}", but got ${actualQuantity}. The cart is not handling quantities correctly.`);
  }
});

When('I add product {string} to the cart again', async function (productName) {
  this.cartPage = new CartPage(this.page);
  await this.cartPage.addProductToCartAgain(productName);
});

Then('the cart should contain {string} twice', async function (productName) {
  this.cartPage = new CartPage(this.page);
  const products = await this.cartPage.getCartProducts();
  const occurrences = products.filter(product => product === productName).length;
  if (occurrences !== 2) {
    throw new Error(`Expected "${productName}" to appear twice in the cart, but found ${occurrences} occurrences.`);
  }
});

Given('I have product {string} in the cart', async function (productName) {
  this.cartPage = new CartPage(this.page);
  await this.cartPage.addProductToCart(productName);
});

Then('I should see an error message indicating the cart is empty', async function () {
  this.cartPage = new CartPage(this.page);
  const alertMessage = await this.cartPage.getEmptyCartAlertMessage();
  if (!alertMessage.includes('Your cart is empty')) {
    throw new Error(`Expected alert message to indicate the cart is empty, but got: "${alertMessage}"`);
  }
});


