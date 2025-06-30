import { expect, test } from "@playwright/test";

test.describe('Pulpit test', async () => {

    test('send money to someone', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('testerHi');
        await page.getByTestId('password-input').fill('08987654321');
        await page.getByTestId('login-button').click();


        await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');
        await page.locator('#widget_1_transfer_receiver').selectOption('2');
        await page.locator('#widget_1_transfer_amount').fill('150');
        await page.locator('#widget_1_transfer_title').fill('Zwrot środków');
        // await page.getByRole('button', { name: 'wykonaj' }).click();
        await page.locator('#execute_btn').click();

        await page.getByTestId('close-button').click();
        // await page.getByRole('link', { name: 'Przelew wykonany! Chuck' }).click();
        await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Chuck Demobankowy - 150,00PLN - Zwrot środków');
        await expect(page.getByTestId('message-text')).toHaveText('Przelew wykonany! Chuck Demobankowy - 150,00PLN - Zwrot środków');
 
    });


    test.only('sucessful mobile top-up', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('sanderka');
        await page.getByTestId('password-input').fill('Qawsed1-');
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