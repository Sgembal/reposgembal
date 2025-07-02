import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('User login to demo bank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Arrange
  const expectedMessageLogin = 'identyfikator ma min. 8 znaków';
  const incorrectUserId = 'log';
  const incorrectUserPassword = '1234';
  const expectedMessagePassword = 'hasło ma min. 8 znaków';

  test('sucesfully login with correct credential', async ({ page }) => {
    //Arrange
    const expectedUsername = 'Jan Demobankowy';
    // Act
    const userPassword = loginData.userPassword;
    const userId = loginData.userId;
    //nasza klasa jest z dużej litery a nasz obiekt z małej litery
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
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
    //Arrange
    const userId = loginData.userId;
    //Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(incorrectUserPassword);
    await page.getByTestId('password-input').blur();
    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedMessagePassword,
    );
  });
});
