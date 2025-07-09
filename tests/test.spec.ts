import test from '@playwright/test';
import { expect } from '@playwright/test';

test.describe('groupOfTest', async () => {
  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://example.com');
  });

  test('testName', async ({ page }) => {
    await page.locator('#testowy_locator').click();

    await page.waitForSelector('#login-button', { state: 'visible' });
    await page.waitForSelector('.spinner', { state: 'detached' });
    await page.locator('#login-button').waitFor(); // domyślnie: attached
    await page.locator('.message').waitFor({ state: 'visible' });
    await page.locator('.spinner').waitFor({ state: 'detached' });

    // await expect(page.locator('#success')).toBeVisible();
    // await expect(page.locator('.spinner')).toBeHidden();
    // await expect(page.locator('.alert')).toHaveText('Zalogowano');
    // 🔹 Zaletą expect() jest to, że: automatycznie czeka (retry) daje lepsze logi i komunikaty o błędach
  });
});
