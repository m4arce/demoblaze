const { Given, When, Then } = require('@cucumber/cucumber');
const AuthPage = require('../../pages/auth.page');
const LoginPage = require('../../pages/login.page');
const testData = require('../../utils/testData');

Given('I have a valid user registered', async function () {
  // Usa el usuario fijo de testData, no crea uno nuevo
  this.testUser = {
    username: testData.validUsername,
    password: testData.validPassword
  };
  this.loginPage = new LoginPage(this.page);
});

When('I open the login modal', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.openLoginModal();
});

When('I login with the registered username and password', async function () {
  // Usar usuario fijo de testData
  await this.loginPage.fillLogin(testData.validUsername, testData.validPassword);
  let dialogMessage = null;
  this.page.once('dialog', async (dialog) => {
    dialogMessage = dialog.message();
    await dialog.accept();
    this.dialogMessage = dialogMessage;
  });
  await this.loginPage.submitLogin();
  await this.page.waitForTimeout(500);
});

When('I login with username {string} and password {string}', async function (username, password) {
  await this.loginPage.fillLogin(username, password);
  let dialogMessage = null;
  this.page.once('dialog', async (dialog) => {
    dialogMessage = dialog.message();
    await dialog.accept();
    this.dialogMessage = dialogMessage;
  });
  await this.loginPage.submitLogin();
  await this.page.waitForTimeout(500);
});

Then('I should see a welcome message with the username', async function () {
  await this.page.waitForSelector('#nameofuser', { timeout: 5000 });
  const welcomeText = await this.loginPage.getWelcomeText();
  if (!welcomeText.includes(testData.validUsername)) {
    throw new Error(`Expected welcome message with username, got: "${welcomeText}"`);
  }
});

Then('I should see an alert indicating invalid credentials', async function () {
  if (!this.dialogMessage || !this.dialogMessage.toLowerCase().includes('wrong')) {
    throw new Error(`Expected alert for invalid credentials, got: "${this.dialogMessage}"`);
  }
});

Then('I should see an alert indicating required fields in login', async function () {
  if (!this.dialogMessage || !this.dialogMessage.toLowerCase().includes('fill')) {
    throw new Error(`Expected alert for required fields in login, got: "${this.dialogMessage}"`);
  }
});
