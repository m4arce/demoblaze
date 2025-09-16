const BasePage = require('./base.page');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    // Selectores del login modal
    this.loginHeaderButton = '#login2'; // Botón "Log in" en el header
    this.loginModalSelector = '#logInModal'; // Modal de login
    this.loginUsername = '#loginusername'; // Input username
    this.loginPassword = '#loginpassword'; // Input password
    this.loginSubmit = '#logInModal button.btn-primary'; // Botón azul "Log in" en el modal
    this.userWelcomeSelector = '#nameofuser'; // Mensaje de bienvenida
  }

  async openLoginModal() {
    await this.click(this.loginHeaderButton);
    await this.page.waitForSelector(this.loginModalSelector, { state: 'visible' });
  }

  async fillLogin(username, password) {
    await this.fill(this.loginUsername, username);
    await this.fill(this.loginPassword, password);
  }

  async submitLogin() {
    await this.click(this.loginSubmit);
  }

  async getWelcomeText() {
    const el = await this.page.$(this.userWelcomeSelector);
    if (!el) return '';
    return await el.textContent();
  }
}

module.exports = LoginPage;
