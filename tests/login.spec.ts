import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { UserBuilder } from '../test-data/user.builder';
//czy można tylko użyć git pull ?
test.describe('User login to demo bank', () => {
  test.describe.configure({ retries: 3 });
  let loginPage: LoginPage;
  let userBuilder: UserBuilder;

  test.beforeEach(async ({ page }) => {
    //nasza klasa jest z dużej litery a nasz obiekt z małej litery
    userBuilder = new UserBuilder();
    loginPage = new LoginPage(page);
    await page.goto('/');
  });

  test(
    //  'sucesfully login with correct credential @login @smoke',
    'sucesfully login with correct credential ',
    // obiekt konfiguracyjny
    {
      tag: ['@login', '@smoke'],
      annotation: {
        type: 'login test',
        description: 'happy path for succesfull login',
      },
    },
    async ({ page }) => {
      const expectedUsername = 'Jan Demobankowy';
      const user = userBuilder
        .withUserId('SandraTestowa')
        .withUserPassword('TestPassword123')
        .build();
      loginPage.login(user.userId, user.userPassword);
      await expect(page.getByTestId('user-name')).toHaveText(expectedUsername);
    }
  );

  test(
    'unsucesfull login with to short username',
    {
      tag: ['@login', '@smoke'],
      annotation: {
        type: 'documentation',
        description:
          'https://www.youtube.com/watch?v=SzWs96aDyxk&list=PLfKhn9AcZ-cD2TCB__K7NP5XARaCzZYn7&index=29',
      },
    },
    async ({ page }) => {
      const incorrectUserId = 'log';
      const expectedMessageLogin = 'identyfikator ma min. 8 znaków';

      await loginPage.loginInput.fill(incorrectUserId);
      await loginPage.passwordInput.click();

      await expect(loginPage.loginError).toHaveText(expectedMessageLogin);
    }
  );

  test(
    'unsucesfull login with to short password',
    { tag: ['@login', '@smoke'] },
    async ({ page }) => {
      //Arrange
      const userId = loginData.userId;
      const incorrectUserPassword = '1234';
      const expectedMessagePassword = 'hasło ma min. 8 znaków';
      //Act
      await loginPage.loginInput.fill(userId);
      await loginPage.passwordInput.fill(incorrectUserPassword);
      await loginPage.passwordInput.blur();
      //Assert
      await expect(loginPage.passwordError).toHaveText(expectedMessagePassword);
    }
  );
});
