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

  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.getByRole('textbox', { name: 'User Name' }).fill(user);
  await page.getByRole('textbox', { name: 'Password' }).fill(pass);
  await page.locator('#btnsubmit').click();
  await page.waitForLoadState('networkidle');
  await page.locator('#mi_a_suppliers').click();
  await page.waitForTimeout(2500);
  console.log('URL_AFTER_SUPPLIER_MENU=' + page.url());
  const ids = await page.$$eval('*', (els) => [...new Set(els.map((e) => e.id).filter(Boolean))]);
  console.log(ids.filter((id) => /supplier|customer|btn|add|search|psearch|ew|tbl/.test(id)).slice(0, 200).join(' | '));
  const bodyText = await page.locator('body').innerText();
  console.log(bodyText.slice(0, 1000));
  await browser.close();
})();
