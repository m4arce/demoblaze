const { Given, When, Then } = require('@cucumber/cucumber');
const AuthPage = require('../../pages/auth.page');
const helpers = require('../../utils/helpers');
const testData = require('../../utils/testData');

Given('I open the demoblaze home page', async function () {
  // Navega a la baseUrl definida en hooks
  await this.page.goto(this.baseUrl);
});

When('I open the sign up modal', async function () {
  // Instancia AuthPage y abre el modal
  this.authPage = new AuthPage(this.page);
  await this.authPage.openSignUpModal();
});

// Usar page.on('dialog', ...) para capturar cualquier alert
When('I create a new user with username generado y password válido', async function () {
  // Genera un username único con timestamp corto (últimos 5 dígitos)
  const ts = Date.now().toString().slice(-5); // Ejemplo: '23453'
  const username = `testuser_demo_${ts}`;
  const password = testData.validPassword;
  this.testUser = { username, password };
  await this.authPage.fillSignUp(username, password);
  const [dialog] = await Promise.all([
    this.page.waitForEvent('dialog', { timeout: 5000 }),
    this.authPage.submitSignUp()
  ]);
  this.dialogMessage = dialog.message();
  //console.log(`Usuario creado para login: ${username}`); // Log del usuario creado
  await dialog.accept();
});

// Método utilitario para aceptar cualquier alert automáticamente
async function autoAcceptAlert(page, context) {
  page.once('dialog', async (dialog) => {
    if (context) context.dialogMessage = dialog.message();
    await dialog.accept();
  });
}

When('I create a new user with username {string} y password {string}', async function (username, password) {
  await this.authPage.fillSignUp(username, password);
  let dialogMessage = null;
  this.page.once('dialog', async (dialog) => {
    dialogMessage = dialog.message();
    await dialog.accept();
    this.dialogMessage = dialogMessage;
  });
  await this.authPage.submitSignUp();
  await this.page.waitForTimeout(500);
  if (username && password) {
    this.testUser = { username, password };
  }
});

Then('I should see an alert with text {string}', async function (expectedText) {
  if (!this.dialogMessage) {
    throw new Error('No alert/dialog was captured.');
  }
  if (this.dialogMessage !== expectedText) {
    throw new Error(`Alert text mismatch. Expected: "${expectedText}" Got: "${this.dialogMessage}"`);
  }
});

Then('I should see an alert containing {string}', async function (expectedSubstr) {
  if (!this.dialogMessage) {
    throw new Error('No alert/dialog was captured.');
  }
  if (!this.dialogMessage.includes(expectedSubstr)) {
    throw new Error(`Alert text does not contain "${expectedSubstr}". Actual: "${this.dialogMessage}"`);
  }
});

Then('I should see an alert indicating required fields in sign up', async function () {
  if (!this.dialogMessage) {
    throw new Error('No alert was shown for empty fields in sign up.');
  }
  // Solo verifica que el mensaje contenga la palabra "fill" para validar la lógica
  if (!this.dialogMessage.toLowerCase().includes('fill')) {
    throw new Error(`Alert does not indicate required fields. Actual: "${this.dialogMessage}"`);
  }
});
