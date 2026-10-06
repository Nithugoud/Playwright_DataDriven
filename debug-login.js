const { chromium } = require('playwright');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve('d:/Framework_POM/.env') });

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const url = process.env.BASE_URL || process.env.URL;
  const user = process.env.BASE_USER || process.env.USER || process.env.USERNAME;
  const pass = process.env.BASE_PASS || process.env.PASS || process.env.PASSWORD;

  console.log(JSON.stringify({ url: !!url, user: !!user, pass: !!pass }));
  if (!url || !user || !pass) {
    console.error('Missing env values');
    await browser.close();
    process.exit(1);
  }

  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.getByRole('textbox', { name: 'User Name' }).fill(user);
  await page.getByRole('textbox', { name: 'Password' }).fill(pass);
  await page.locator('#btnsubmit').click();
  await page.waitForTimeout(3000);
  console.log('URL_AFTER_LOGIN=' + page.url());
  const ids = await page.$$eval('*', (els) => [...new Set(els.map((e) => e.id).filter(Boolean))]);
  console.log(ids.filter((id) => /supplier|customer|logout|mi_/.test(id)).slice(0, 80).join(' | '));
  await browser.close();
})();
