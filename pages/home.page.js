class HomePage {
  constructor(page) {
    this.page = page;
    this.productListSelector = '.card-title';
    this.nextButtonSelector = '#next2';
    this.prevButtonSelector = '#prev2';
    this.categorySelector = '.list-group-item';
  }

  async waitForProductList() {
    await this.page.waitForSelector(this.productListSelector, { state: 'visible' });
  }

  async getFirstProductName() {
    await this.waitForProductList();
    const first = await this.page.$(this.productListSelector);
    return first ? (await first.textContent()).trim() : '';
  }

  async navigate(direction) {
    const buttonSelector = direction === 'next' ? this.nextButtonSelector : this.prevButtonSelector;
    await this.page.click(buttonSelector);
    await this.waitForProductList();
  }

  async selectCategory(category) {
    const categoryElement = await this.page.$(`.list-group-item:has-text("${category}")`);
    if (categoryElement) {
      await categoryElement.click();
      await this.waitForProductList();
    } else {
      throw new Error(`Category "${category}" not found.`);
    }
  }

  async getProductCount() {
    await this.waitForProductList();
    const products = await this.page.$$(this.productListSelector);
    return products.length;
  }

  async addProductToCart(productName) {
    await this.waitForProductList();
    const productCard = await this.page.$(`.card:has(.card-title:has-text("${productName}"))`);
    if (productCard) {
      const productLink = await productCard.$('a');
      if (productLink) {
        await productLink.click();
        await this.page.waitForSelector('a.btn.btn-success', { state: 'visible' });
        await this.page.click('a.btn.btn-success');
      }
    } else {
      throw new Error(`Product "${productName}" not found.`);
    }
  }
}

module.exports = HomePage;
