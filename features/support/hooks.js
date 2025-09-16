const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const playwright = require('playwright');
const fs = require('fs');
const path = require('path');

setDefaultTimeout(60 * 1000); // Timeout por escenario

Before(async function () {
  // Lanzar navegador Chromium en modo headless
  this.browser = await playwright.chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.baseUrl = 'https://www.demoblaze.com';
});

After(async function (scenario) {
  // Si el escenario falla, guardar screenshot y adjuntar al reporte
  try {
    const failed = scenario.result?.status === 'FAILED' || scenario.result?.status === 'failed';
    if (failed) {
      const reportsDir = path.resolve(process.cwd(), 'reports');
      if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
      const file = path.join(reportsDir, `screenshot-${Date.now()}.png`);
      await this.page.screenshot({ path: file, fullPage: true });
      if (this.attach) {
        // Adjunta el contenido binario del screenshot para el reporte HTML
        await this.attach(fs.readFileSync(file), 'image/png');
      }
    }
  } catch (err) {
    console.error('Error saving screenshot:', err.message);
  }
  // Cerrar recursos
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});
