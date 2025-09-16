const { Given, When, Then } = require('@cucumber/cucumber');
const HomePage = require('../../pages/home.page');

When('I list the products', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.waitForProductList();
});

Then('the first product should be {string}', async function (expectedName) {
  const firstProduct = await this.homePage.getFirstProductName();
  if (firstProduct !== expectedName) {
    throw new Error(`Expected first product to be "${expectedName}", got "${firstProduct}"`);
  }
});

When('I click next on the product list', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.navigate('next');
  await this.page.waitForTimeout(2000); // Espera fija para asegurar que el contenido se actualice
});

When('I click previous on the product list', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.navigate('previous');
  await this.page.waitForTimeout(2000); // Espera fija para asegurar que el contenido se actualice
});

Then('the product list should be empty', async function () {
  const count = await this.homePage.getProductCount();
  if (count !== 0) {
    throw new Error(`Expected product list to be empty, but found ${count} products.`);
  }
});

When('I select category {string}', async function (category) {
  this.homePage = new HomePage(this.page);
  await this.homePage.selectCategory(category);
});

Then('the product list should show {int} products', async function (expectedCount) {
  const count = await this.homePage.getProductCount();
  if (count !== expectedCount) {
    throw new Error(`Expected ${expectedCount} products, but found ${count}.`);
  }
});
