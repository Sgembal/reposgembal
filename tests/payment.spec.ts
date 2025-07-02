import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.describe('Payment test', async () => {
  //  Arrange

  test.beforeEach(async ({ page }) => {
    const userPassword = loginData.userPassword;
    const userId = loginData.userId;
    await page.goto('/');
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.getByRole('link', { name: 'płatności' }).click();
  });

  test('simple payment', async ({ page }) => {
    //Arrange
    const transferReciever = 'Jan Nowak';
    const transferAccount = '12 3456 7890 1234 5678 9123 67128';
    const transferAmount = '22';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReciever}`;

    //Act
    await page.getByTestId('transfer_receiver').fill(transferReciever);
    await page.getByTestId('form_account_to').click();
    await page.getByTestId('form_account_to').fill(transferAccount);
    await page.getByTestId('form_amount').fill(transferAmount);
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    await page.getByTestId('close-button').click();
    //Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });
});
