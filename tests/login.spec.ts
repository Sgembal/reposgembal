import { test, expect } from '@playwright/test';

test.describe('User login to demo bank', () => {

  test('sucesfully login with correct credential', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('testerHi');
    await page.getByTestId('password-input').fill('08987654321');
    await page.getByTestId('login-button').click();
    await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy')

  });


  test('unsucesfull login with to short username', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('tester');
    await page.getByTestId('password-input').click();

    await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków')
  });

  test('unsucesfull login with to short password', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('testerHi');
    await page.getByTestId('password-input').fill('1234');    
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków')

  });

});