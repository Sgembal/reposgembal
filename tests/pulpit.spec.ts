import { expect, test } from '@playwright/test';

test.describe('Pulpit test', async () => {
  //  Arrange
  test.beforeEach(async ({ page }) => {
    const userPassword = '08987654321';
    const userId = 'testerHi';
    await page.goto('/');
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
  });

  const reciverId = '2';
  const transferAmount = '150';
  const transferTitile = 'Zwrot środków';
  const expectedTransferReciver = 'Chuck Demobankowy';
  const numberOption = '500 xxx xxx';
  const expectedMessage = `Doładowanie wykonane! ${transferAmount},00PLN na numer ${numberOption}`;

  // Act
  test('send money to someone', async ({ page }) => {
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

  test('sucessful mobile top-up', async ({ page }) => {
    await page.locator('#widget_1_topup_receiver').selectOption(numberOption);
    await page.locator('#widget_1_topup_amount').fill(transferAmount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();
    await expect(page.getByTestId('message-text')).toHaveText(expectedMessage);
    // albo za pomocą lokatora page.locator(#show_messages).toHaveText('Doładowanie wykonane! 12,00PLN na numer 500 xxx xxx')
  });
});
