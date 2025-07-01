import { test, expect } from '@playwright/test';

test.describe('User login to demo bank', () => {
  // Arrange

  //hook -->
  test.beforeEach(async ({ page }) => {
    const url = 'https://demo-bank.vercel.app/';
    await page.goto(url);
  });

  const userPassword = '08987654321';
  const userId = 'testerHi';
  const expectedUsername = 'Jan Demobankowy';
  const expectedMessageLogin = 'identyfikator ma min. 8 znaków';
  const incorrectUserId = 'log';
  const incorrectUserPassword = '1234';
  const expectedMessagePassword = 'hasło ma min. 8 znaków';

  test('sucesfully login with correct credential', async ({ page }) => {
    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUsername);
  });

  test('unsucesfull login with to short username', async ({ page }) => {
    await page.getByTestId('login-input').fill(incorrectUserId);
    await page.getByTestId('password-input').click();

    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedMessageLogin,
    );
  });

  test('unsucesfull login with to short password', async ({ page }) => {
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(incorrectUserPassword);
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedMessagePassword,
    );
  });
});
