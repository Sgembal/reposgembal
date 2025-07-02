import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Pulpit test', async () => {
  test.beforeEach(async ({ page }) => {
    const userPassword = '08987654321';
    const userId = 'testerHi';
    await page.goto('/');

    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });

  test('send money to someone', async ({ page }) => {
    // Act
    const reciverId = '2';
    const transferTitile = 'Zwrot środków';
    const expectedTransferReciver = 'Chuck Demobankowy';
    const transferAmount = '150';
    const numberOption = '500 xxx xxx';
    //Arrange
    await page.locator('#widget_1_transfer_receiver').selectOption(reciverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitile);
    await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();
    // Assert
    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! ${expectedTransferReciver} - ${transferAmount},00PLN - ${transferTitile}`,
    );

    // await expect(page.getByTestId('message-text')).toHaveText('Przelew wykonany! Chuck Demobankowy - 150,00PLN - Zwrot środków');
  });

  test('correct balance after sucessful mobile top-up', async ({ page }) => {
    //Arrange
    const transferAmount = '150';
    const numberOption = '500 xxx xxx';
    const expectedMessage = `Doładowanie wykonane! ${transferAmount},00PLN na numer ${numberOption}`;
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(transferAmount);
    //Act
    await page.locator('#widget_1_topup_receiver').selectOption(numberOption);
    await page.locator('#widget_1_topup_amount').fill(transferAmount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();
    //Assert
    await expect(page.locator('#money_value')).toHaveText(`${expectedBalance}`);
    await expect(page.getByTestId('message-text')).toHaveText(expectedMessage);
    // albo za pomocą lokatora page.locator(#show_messages).toHaveText('Doładowanie wykonane! 12,00PLN na numer 500 xxx xxx')
  });

  test('sucessful mobile top-up', async ({ page }) => {
    const transferAmount = '150';
    const numberOption = '500 xxx xxx';
    const expectedMessage = `Doładowanie wykonane! ${transferAmount},00PLN na numer ${numberOption}`;

    await page.locator('#widget_1_topup_receiver').selectOption(numberOption);
    await page.locator('#widget_1_topup_amount').fill(transferAmount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();
    await expect(page.getByTestId('message-text')).toHaveText(expectedMessage);
    // albo za pomocą lokatora page.locator(#show_messages).toHaveText('Doładowanie wykonane! 12,00PLN na numer 500 xxx xxx')
  });
});
