import { expect, test } from "@playwright/test";

test.describe('Pulpit test', async () => {
    //  Arrange
    const url = 'https://demo-bank.vercel.app/';
    const userPassword = '08987654321';
    const userId = 'testerHi';

    const reciverId = '2';
    const transferAmount = '150';
    const transferTitile = 'Zwrot środków';
    const expectedTransferReciver = 'Chuck Demobankowy';

    // Act
    test.only('send money to someone', async ({ page }) => {
        await page.goto(url);
        await page.getByTestId('login-input').fill(userId);
        await page.getByTestId('password-input').fill(userPassword);
        await page.getByTestId('login-button').click();


        await page.locator('#widget_1_transfer_receiver').selectOption(reciverId);
        await page.locator('#widget_1_transfer_amount').fill(transferAmount);
        await page.locator('#widget_1_transfer_title').fill(transferTitile);
        await page.locator('#execute_btn').click();
        await page.getByTestId('close-button').click();
        
        // Assert
        await expect(page.locator('#show_messages')).toHaveText(`Przelew wykonany! ${expectedTransferReciver} - ${transferAmount},00PLN - ${transferTitile}`);
       
       
        // await expect(page.getByTestId('message-text')).toHaveText('Przelew wykonany! Chuck Demobankowy - 150,00PLN - Zwrot środków');

    });


    test('sucessful mobile top-up', async ({ page }) => {
        await page.goto(url);
        await page.getByTestId('login-input').fill(userId);
        await page.getByTestId('password-input').fill(userPassword);
        await page.getByTestId('login-button').click();
        await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
        await page.locator('#widget_1_topup_amount').fill('12');
        await page.locator('#uniform-widget_1_topup_agreement span').click();
        await page.getByRole('button', { name: 'doładuj telefon' }).click();
        await page.getByTestId('close-button').click();
        await expect(page.getByTestId('message-text')).toHaveText('Doładowanie wykonane! 12,00PLN na numer 500 xxx xxx');
        // albo za pomocą lokatora page.locator(#show_messages).toHaveText('Doładowanie wykonane! 12,00PLN na numer 500 xxx xxx')

    });

});