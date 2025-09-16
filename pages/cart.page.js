class CartPage {
    constructor(page) {
    this.page = page;
    this.selectors = {
      cartTableRows: '#tbodyid tr.success',
      cartTotal: '#totalp',
      deleteButton: 'a[onclick^="deleteItem"]',
      cartLink: 'a.nav-link[onclick="showcart()"]',
      addToCartButton: 'a.btn-success',
      orderModalButton: 'button[data-target="#orderModal"]', 
      errorMessage: '#errorMessage' //prueba porque en verdad no existe este error
    };
  }

  async addProductToCart(productName) {
    const productLink = await this.page.locator(`a:has-text("${productName}")`);
    await productLink.click();
    await this.page.locator(this.selectors.addToCartButton).click();
    const dialog = await this.page.waitForEvent('dialog');
    await dialog.accept();
  }

  async addProductToCartAgain(productName) {
  // Regresar al home para seleccionar el producto nuevamente
  await this.page.locator('a.nav-link:has-text("Home (current)")').click();
  await this.page.waitForSelector(`a:has-text("${productName}")`, { state: 'visible', timeout: 10000 });
  // Reutilizar la lógica de agregar el producto
  await this.addProductToCart(productName);
}

  async goToCart() {
    await this.page.locator(this.selectors.cartLink).click();
    await this.page.waitForSelector(this.selectors.cartTableRows, { state: 'visible', timeout: 10000 });
  }

async getCartProducts() {
 try {
    await this.page.waitForSelector(this.selectors.cartTableRows, { state: 'visible', timeout: 10000 });
    const rows = await this.page.$$(this.selectors.cartTableRows);
    const products = [];
    for (const row of rows) {
      const nameCell = await row.$('td:nth-child(2)');
      if (nameCell) {
        const name = (await nameCell.textContent()).trim();
        products.push(name);
      } else {
        console.warn('Product name not found in row:', row); // Depuración
      }
    }
    console.log('Products in cart:', products); // Depuración
    return products;
  } catch (error) {
    console.warn('No rows found in the cart. The cart might be empty.'); // Depuración
    return []; // Retorna un array vacío si no hay filas visibles
  }
}

async removeProductFromCart(productName) {

  const products = await this.getCartProducts();
console.log('Products in cart before deletion:', products); // Depuración

  const rows = await this.page.$$(this.selectors.cartTableRows);
  console.log(`Found ${rows.length} rows in the cart.`); // Depuración
  for (const row of rows) {
    const nameCell = await row.$('td:nth-child(2)');
    if (nameCell) {
      const name = (await nameCell.textContent()).trim();
      console.log(`Row product name: ${name}`); // Depuración
      if (name === productName) {
        const deleteButton = await row.$(this.selectors.deleteButton);
        if (deleteButton) {
          await deleteButton.click();
          console.log(`Deleted product: ${productName}`); // Depuración
           await this.page.waitForSelector(`td:has-text("${productName}")`, { state: 'detached', timeout: 10000 });
          console.log(`Product "${productName}" removed from the cart.`); // Depuración
          return;
        }
      }
    }
  }
  throw new Error(`Product "${productName}" not found in the cart.`);
}

async calculateExpectedTotal() {
  const rows = await this.page.$$(this.selectors.cartTableRows);
  let total = 0;
  for (const row of rows) {
    const priceCell = await row.$('td:nth-child(3)'); // Ajusta el índice según la columna de precios
    if (priceCell) {
      const price = parseFloat((await priceCell.textContent()).trim());
      total += price;
    }
  }
  return total;
}

  async getCartTotal() {
    await this.page.waitForSelector(this.selectors.cartTotal, { state: 'visible', timeout: 30000 });
    const totalText = await this.page.textContent(this.selectors.cartTotal);
    return parseInt(totalText, 10);
  }

async getProductQuantity(productName) {
  await this.page.waitForSelector(this.selectors.cartTableRows, { state: 'visible', timeout: 10000 });
  const rows = await this.page.$$(this.selectors.cartTableRows);
  for (const row of rows) {
    const nameCell = await row.$('td:nth-child(2)');
    const quantityCell = await row.$('td:nth-child(4)'); // Ajusta el índice según la columna de cantidad
    if (nameCell && (await nameCell.textContent()).trim() === productName) {
      if (quantityCell) {
        return parseInt((await quantityCell.textContent()).trim(), 10);
      }
    }
  }
  return 0; // Si no se encuentra el producto, retorna 0
}

async openOrderModal() {
  await this.page.getByRole('button', { name: 'Place Order' }).click();
  console.log('Order modal opened.'); // Depuración
}

async getEmptyCartAlertMessage() {
  try {
    const dialog = await this.page.waitForEvent('dialog', { timeout: 5000 });
    const message = dialog.message();
    await dialog.dismiss(); // Cierra el alert
    console.log('Alert message:', message); // Depuración
    return message;
  } catch (error) {
    console.warn('No alert was shown.'); // Depuración
    return '';
  }
}
}

module.exports = CartPage;