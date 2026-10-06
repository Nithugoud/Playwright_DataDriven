import { test as base, expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { Adminloginpage } from '../Pages/Adminloginpage';
import { Adminlogout } from '../Pages/Adminlogout';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const baseUrl = process.env.BASE_URL ?? process.env.URL;
const baseUser = process.env.BASE_USER ?? process.env.USER ?? process.env.USERNAME;
const basePass = process.env.BASE_PASS ?? process.env.PASS ?? process.env.PASSWORD;

if (!baseUrl || !baseUser || !basePass) {
  throw new Error(
    'Missing required env vars: BASE_URL (or URL), and login credentials. Create a .env file in the project root with BASE_URL, BASE_USER, and BASE_PASS (or URL/USER/PASS).'
  );
}

export const test = base;

test.beforeEach(async ({ page }) => {
  const loginpage = new Adminloginpage(page);
  await loginpage.launchUrl(baseUrl);
  await loginpage.ERPLogin(baseUser, basePass);
});

test.afterEach(async ({ page }) => {
  if (page.isClosed()) {
    return;
  }

  const logoutpage = new Adminlogout(page);
  const logoutVisible = await page.locator('li#mi_logout').isVisible().catch(() => false);

  if (logoutVisible) {
    await logoutpage.ERPlogout();
  }
});

export { expect };
