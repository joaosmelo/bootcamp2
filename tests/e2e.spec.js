// tests/e2e.spec.js
const { chromium } = require('playwright');

const path = require('path');

(async () => {
  // Path to extension inside container
  const extensionPath = path.join(__dirname, '..', 'extension');

  // Launch persistent context so extensions are allowed (headful)
  const userDataDir = '/tmp/playwright-user-data-dir';
  const args = [
    `--disable-extensions-except=${extensionPath}`,
    `--load-extension=${extensionPath}`
  ];

  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    args,
  });

  try {
    const page = await context.newPage();
    // Example: open chrome-extension://<id>/options.html OR the extension's action page
    // Without knowing the extension id beforehand, we can open chrome://extensions to verify it's loaded:
    await page.goto('chrome://extensions');
    await page.screenshot({ path: 'extensions-page.png' });

    console.log('Opened chrome://extensions and saved screenshot extensions-page.png');
  } finally {
    await context.close();
  }
  process.exit(0);
})();
