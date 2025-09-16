// Clase base para todas las páginas. Provee utilidades genéricas.
class BasePage {
  /**
   * @param {import('playwright').Page} page - instancia de Playwright Page
   */
  constructor(page) {
    this.page = page;
    this.page.setDefaultTimeout(5000);
  }

  // Navega a una URL
  async goto(url) {
    await this.page.goto(url);
  }

  // Hace click en un selector
  async click(selector) {
    await this.page.waitForSelector(selector, { state: 'visible' });
    await this.page.click(selector);
  }

  // Llena un input
  async fill(selector, value) {
    await this.page.waitForSelector(selector, { state: 'visible' });
    await this.page.fill(selector, value);
  }

  // Obtiene el texto de un selector
  async text(selector) {
    await this.page.waitForSelector(selector, { state: 'visible' });
    return this.page.textContent(selector);
  }

  // Utilidad para aceptar cualquier alert automáticamente
  async autoAcceptAlert(context) {
    this.page.once('dialog', async (dialog) => {
      if (context) context.dialogMessage = dialog.message();
      await dialog.accept();
    });
  }
}

module.exports = BasePage;
