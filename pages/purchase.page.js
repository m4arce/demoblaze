class PurchasePage {
  constructor(page) {
    this.page = page;
    this.formSelectors = {
      name: '#name',
      country: '#country',
      city: '#city',
      card: '#card',
      month: '#month',
      year: '#year',
    };
  this.cartHeaderSelector = 'a#cartur';
  this.cartListSelector = '#tbodyid > tr > td:nth-child(2)';
  this.placeOrderButtonSelector = 'button.btn.btn-success[data-target="#orderModal"]';
  this.purchaseButtonSelector = '#orderModal .btn.btn-primary';
  this.successMessageSelector = '.sweet-alert.showSweetAlert.visible';
  this.requiredFieldsAlertText = 'Please fill out Name and Creditcard';
  }

  async fillForm({ name, country, city, card, month, year }) {
    await this.page.fill(this.formSelectors.name, name);
    await this.page.fill(this.formSelectors.country, country);
    await this.page.fill(this.formSelectors.city, city);
    await this.page.fill(this.formSelectors.card, card);
    await this.page.fill(this.formSelectors.month, month);
    await this.page.fill(this.formSelectors.year, year);
  }

  async goToCart() {
    await this.page.click(this.cartHeaderSelector);
    await this.page.waitForSelector(this.placeOrderButtonSelector, { state: 'visible' });
  }

  async openOrderModal() {
    await this.page.click(this.placeOrderButtonSelector);
    await this.page.waitForSelector('#orderModal', { state: 'visible' });
  }

async confirmPurchase() {
  await this.page.locator('button[onclick="purchaseOrder()"]').click(); // Botón "Purchase"
  console.log('Purchase button clicked.'); // Depuración
}

async getSuccessMessage() {
  const successElement = this.page.locator('body > div.sweet-alert.showSweetAlert.visible h2');
  try {
    await successElement.waitFor({ state: 'visible', timeout: 15000 }); // Espera el mensaje de éxito
    const message = await successElement.textContent(); // Captura el texto del mensaje
    console.log('Success message captured:', message); // Depuración

    // Clic en el botón "OK" para cerrar el modal
    const okButton = this.page.locator('body > div.sweet-alert.showSweetAlert.visible button.confirm');
    await okButton.waitFor({ state: 'visible', timeout: 15000 }); // Espera el botón "OK"
    await okButton.click(); // Cierra el modal
    console.log('Success modal closed.'); // Depuración

    return message ? message.trim() : ''; // Retorna el mensaje capturado
  } catch (error) {
    console.error('Error in getSuccessMessage:', error); // Depuración
    throw new Error('The success message did not appear or the modal could not be closed.');
  }
}

  async getRequiredFieldsError() {
    // Captura el alert de campos requeridos
    let alertText = null;
    this.page.once('dialog', async (dialog) => {
      alertText = dialog.message();
      await dialog.accept();
    });
    // Intenta confirmar la compra para disparar el alert
    await this.confirmPurchase();
    await this.page.waitForTimeout(500);
    return alertText;
  }
}

module.exports = PurchasePage;
