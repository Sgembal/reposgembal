import { test, expect } from '@playwright/test';

test.describe('User login to demo bank', () => {
  
    // Arrange 
    const url = 'https://demo-bank.vercel.app/';
    const userPassword = '08987654321';
    const userId = 'testerHi';
    const expectedUsername = 'Jan Demobankowy';

  test.only('sucesfully login with correct credential', async ({ page }) => {

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUsername)

  });


  test('unsucesfull login with to short username', async ({ page }) => {
    await page.goto(url);
    await page.getByTestId('login-input').fill('tester');
    await page.getByTestId('password-input').click();

    await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków')
  });

  test('unsucesfull login with to short password', async ({ page }) => {
    await page.goto(url);
    await page.getByTestId('login-input').fill('testerHi');
    await page.getByTestId('password-input').fill('1234');
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków')

  });

});