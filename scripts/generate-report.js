const report = require('multiple-cucumber-html-reporter');
const path = require('path');

report.generate({
  jsonDir: path.resolve(process.cwd(), 'reports'),
  reportPath: path.resolve(process.cwd(), 'reports', 'html-report'),
  metadata: {
    browser: { name: 'chromium', version: 'playwright' },
    device: 'Local machine',
    platform: { name: process.platform, version: process.version }
  }
});
