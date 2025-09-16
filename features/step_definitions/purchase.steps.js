const { Given, When, Then, } = require('@cucumber/cucumber');
const CartPage = require('../../pages/cart.page');
const PurchasePage = require('../../pages/purchase.page');
const HomePage = require('../../pages/home.page');

When('I go to the cart', async function () {
  this.purchasePage = new PurchasePage(this.page);
  await this.purchasePage.goToCart();
});

When('I open the order modal', async function () {
  this.purchasePage = new PurchasePage(this.page);
  await this.purchasePage.openOrderModal();
});

When('I fill the purchase form with valid data', async function () {
  this.purchasePage = new PurchasePage(this.page);
  await this.purchasePage.fillForm({
    name: 'fake',
    country: 'testland',
    city: 'testcity',
    card: '1234567890123456',
    month: '08',
    year: '2025'
  });
});

When('I fill the purchase form with empty fields', async function () {
  this.purchasePage = new PurchasePage(this.page);
  await this.purchasePage.fillForm({
    name: '',
    country: '',
    city: '',
    card: '',
    month: '',
    year: ''
  });
});

When('I fill the purchase form with card number {string}', async function (card) {
  this.purchasePage = new PurchasePage(this.page);
  await this.purchasePage.fillForm({
    name: 'fake',
    country: 'testland',
    city: 'testcity',
    card,
    month: '08',
    year: '2025'
  });
});

When('I fill the purchase form with name {string} and country {string}', async function (name, country) {
  this.purchasePage = new PurchasePage(this.page);
  await this.purchasePage.fillForm({
    name,
    country,
    city: 'testcity',
    card: '1234567890123456',
    month: '08',
    year: '2025'
  });
});

When('I confirm the purchase', async function () {
  await this.purchasePage.confirmPurchase();
});

Then('I should see a success message', async function () {
  const successMessage = await this.purchasePage.getSuccessMessage(); // Captura el mensaje desde getSuccessMessage
  console.log('Success message:', successMessage); // Depuración
  if (!successMessage.includes('Thank you for your purchase')) {
    throw new Error(`Expected success message, but got: "${successMessage}"`);
  }
});

Then('the cart should be empty', async function () {
  this.cartPage = new CartPage(this.page);
  const products = await this.cartPage.getCartProducts();
  console.log('Products in cart:', products); // Depuración
  if (products.length > 0) {
    throw new Error(`Expected cart to be empty, but found products: ${products.join(', ')}`);
  }
});

Then('I should see an error message indicating required fields', async function () {
  this.purchasePage = new PurchasePage(this.page);
  try {
    const errorMessage = await this.purchasePage.getErrorMessage();
    console.log('Error message:', errorMessage); // Depuración
    if (!errorMessage.includes('All fields are required')) {
      throw new Error(`Expected error message, but got: "${errorMessage}"`);
    }
  } catch (error) {
    console.error('Validation error not found:', error); // Depuración
    throw new Error('Validation for required fields does not exist in the application.');
  }
});

Then('I should see an error message indicating invalid card number', async function () {
  this.purchasePage = new PurchasePage(this.page);
  try {
    const errorMessage = await this.purchasePage.getErrorMessage();
    console.log('Error message:', errorMessage); // Depuración
    if (!errorMessage.includes('Invalid card number')) {
      throw new Error(`Expected error message for invalid card number, but got: "${errorMessage}"`);
    }
  } catch (error) {
    console.error('Validation error not found:', error); // Depuración
    throw new Error('Validation for numeric card number does not exist in the application.');
  }
});

Then('I should see an error message indicating invalid characters', async function () {
  this.purchasePage = new PurchasePage(this.page);
  try {
    const errorMessage = await this.purchasePage.getErrorMessage();
    console.log('Error message:', errorMessage); // Depuración
    if (!errorMessage.includes('Invalid characters')) {
      throw new Error(`Expected error message for invalid characters, but got: "${errorMessage}"`);
    }
  } catch (error) {
    console.error('Validation error not found:', error); // Depuración
    throw new Error('Validation for invalid characters does not exist in the application.');
  }  
});

Then('I should see an error message indicating login is required', async function () {
  this.purchasePage = new PurchasePage(this.page);
  try {
  const errorMessage = await this.purchasePage.getErrorMessage();
  console.log('Error message:', errorMessage); // Depuración
  if (!errorMessage.includes('login is required')) {
    throw new Error(`Expected login required message, but got: "${errorMessage}"`);
  }
} catch (error) {
  console.error('Validation error not found:', error); // Depuración
  throw new Error('Validation for login requirement does not exist in the application.');
}
});
