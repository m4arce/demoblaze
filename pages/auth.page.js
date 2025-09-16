const BasePage = require('./base.page');

// Página de autenticación: sign up y login
class AuthPage extends BasePage {
  constructor(page) {
    super(page);
    // Selectores del header y modal de Sign up
    this.signUpHeaderButton = '#signin2'; // Botón "Sign up" en el header
    this.signUpModalSelector = '#signInModal'; // Modal de sign up
    this.signUpUsername = '#sign-username'; // Input username
    this.signUpPassword = '#sign-password'; // Input password
    this.signUpSubmit = '#signInModal button.btn-primary'; // Botón azul "Sign up" en el modal
  }

  // Abre el modal de Sign up
  async openSignUpModal() {
    await this.click(this.signUpHeaderButton);
    await this.page.waitForSelector(this.signUpUsername, { state: 'visible' });
  }

  // Llena los campos de sign up
  async fillSignUp(username, password) {
    await this.fill(this.signUpUsername, username);
    await this.fill(this.signUpPassword, password);
  }

  // Envía el formulario de sign up
  async submitSignUp() {
    await this.click(this.signUpSubmit);
    // El sistema muestra un alert (dialog) con el resultado
  }
}

module.exports = AuthPage;
