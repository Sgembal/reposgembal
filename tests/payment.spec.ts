import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';

test.describe('Payment test', async () => {
  test.beforeEach(async ({ page }) => {
    const userPassword = loginData.userPassword;
    const userId = loginData.userId;

    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    await loginPage.sideMenuComponent.menuButton.click
    // await page.getByRole('link', { name: 'płatności' }).click();
  });

  test('simple payment', async ({ page }) => {
    const transferReciever = 'Jan Nowak';
    const transferAccount = '12 3456 7890 1234 5678 9123 67128';
    const transferAmount = '22';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReciever}`;

    const paymentPage = new PaymentPage(page);

    await paymentPage.transferReciever.fill(transferReciever);
    await paymentPage.transferReciever.fill(transferReciever);
    await paymentPage.formAccountTo.fill(transferAccount);
    await paymentPage.formAccountTo.fill(transferAccount);
    await paymentPage.formAmount.fill(transferAmount);
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    await paymentPage.closeButton.click();

    await expect(paymentPage.showMessage).toHaveText(expectedMessage);
  });
});
