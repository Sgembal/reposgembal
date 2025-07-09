import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';
import { UserBuilder } from '../test-data/user.builder';

test.describe('Pulpit test', async () => {
  let pulpitPage: PulpitPage;
  let loginPage: LoginPage;
  let userBuilder: UserBuilder;

  test.beforeEach(async ({ page }) => {
    pulpitPage = new PulpitPage(page);
    loginPage = new LoginPage(page);
    userBuilder = new UserBuilder();
    const user = userBuilder
      .withUserId('NikolaSrola')
      .withUserPassword('Qawsed1-')
      .build();

    loginPage.login(user.userId, user.userPassword);

    await page.goto('/');
  });

  test(
    'send money to someone',
    { tag: ['@test', '@smoke', '@money'] },
    async ({ page }) => {
      const reciverId = '2';
      const transferTitile = 'Zwrot środków';
      const expectedTransferReciver = 'Chuck Demobankowy';
      const transferAmount = '150';

      await pulpitPage.widgetTransferReceiver.selectOption(reciverId);
      await pulpitPage.widgetTransferAmount.fill(transferAmount);
      await pulpitPage.widgetTransferTitle.fill(transferTitile);
      await pulpitPage.executeButton.click();
      await pulpitPage.closeButton.click();

      await expect(pulpitPage.showMessage).toHaveText(
        `Przelew wykonany! ${expectedTransferReciver} - ${transferAmount},00PLN - ${transferTitile}`
      );
    }
  );

  test('correct balance after sucessful mobile top-up', async ({ page }) => {
    //Arrange
    const transferAmount = '150';
    const numberOption = '500 xxx xxx';
    const expectedMessage = `Doładowanie wykonane! ${transferAmount},00PLN na numer ${numberOption}`;
    const initialBalance = await pulpitPage.moneyValue.innerText();
    const expectedBalance = Number(initialBalance) - Number(transferAmount);
    //Act
    await pulpitPage.widgetTopupReciever.selectOption(numberOption);
    await pulpitPage.widgetTopupAmount.fill(transferAmount);
    await pulpitPage.uniformWidget.click();
    await pulpitPage.topUpPhoneButton.click();
    await pulpitPage.closeButton.click();
    //Assert
    await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`);
    await expect(pulpitPage.messageText).toHaveText(expectedMessage);
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
