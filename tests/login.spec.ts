import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('User login to demo bank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

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
    //Arrange
    const incorrectUserId = 'log';
    const expectedMessageLogin = 'identyfikator ma min. 8 znaków';
    //Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(incorrectUserId);
    await loginPage.passwordInput.click();
    //Assert
    await expect(loginPage.loginError).toHaveText(expectedMessageLogin);
  });

  test('unsucesfull login with to short password', async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const incorrectUserPassword = '1234';
    const expectedMessagePassword = 'hasło ma min. 8 znaków';
    //Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(incorrectUserPassword);
    await loginPage.passwordInput.blur();
    //Assert
    await expect(loginPage.passwordError).toHaveText(expectedMessagePassword);
  });
});
