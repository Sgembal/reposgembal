jest to specjalny plik z dokumentacji

# Playwright – Praktyczne wprowadzenie do testów automatycznych

Poznaj z nami automatyzację GUI za pomocą narzędzia Playwright🎭  
Stwórz swoje pierwsze testy End To End od zupełnych podstaw.

## O Repozytorium

Kod z tego repozytorium pochodzi z kursu:

[**Praktyczne wprowadzenie do testów automatycznych z Playwright**](https://jaktestowac.pl/course/playwright-wprowadzenie/)

Jest on częścią Programu:

[**Testy Automatyczne z Playwright**](https://jaktestowac.pl/playwright)

## Podgląd kodu dla danej lekcji lub sekcji

Zlokalizuj etap który chcesz zobaczyć (może to być sekcja lub lekcja)

- Katalogi rozpoczynające się od `S`:
  - oznaczają numer sekcji,
  - zawierają w sobie zbiór lekcji.
- Katalogi rozpoczynające się od `L`:
  - oznaczają numer lekcji,
  - zawierają w sobie `projekt`, który jest rezultatem danej lekcji.

### LEKCJA 1

## Instalacja danego etapu

link do repozytorium : https://github.com/jaktestowac/playwright_automatyzacja_wprowadzenie/blob/main/README.md

1. Pobierz całe repozytorium
2. Rozpakuj je i przenieś do folderu z projektami (np. `Projects`)
3. Przejdź do katalogu danego etapu (możesz go otworzyć w Visual Studio Code) np. `/S01_wprowadzenie/L01_pierwszy_test/`
4. Jeśli znajduje się w nim plik `package.json` możesz odtworzyć dany etap

- uruchom w katalogu etapu konsolę
- wykonaj polecenie `npm install` aby zainstalować zależności
- wykonaj polecenie `npx playwright install` aby pobrać aktualne przeglądarki
- otwórz przglądarkę konkretną `npx playwright codegen https://demo-bank.vercel.app/`
- uruchom testy `npx playwright test`
- uruchom testy ale z przeglądarka `npx playwright test --headed`
- zobacz raport `npx playwright show--report`

1. playwright configuration

- w pliku playwright.config.ts ---> możemy wyłączyć lub włączyć konkretne przeglądarki

/_ Configure projects for major browsers _/
projects: [

```javascript {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },

  // {
  //   name: 'firefox',
  //   use: { ...devices['Desktop Firefox'] },
  // },
```

LEKCJA 2

## Visual Studio Code

- preview: for README.md
- nowy wiersz tutaj podwójna spacja ,żeby w prewiev było widać faktycznie złamanie linni
- Autosave : In File--> Auto save
- Podgląd histroii pliku : klikamy na dany plik tutaj np README.md --> Open Timeline
- formatowanie pliku : editor --> context menu --> format document

test.describe('whole tests'), () => { } <--- żeby ugrupować testy (test.describe można i napisać coś innego niż test moze byc i groupe)
.blur(); <--- jak chcemy wyjść z danego elementu żeby właśnie zobaczyć czy hasło jest za krótkie, żeby utracić focuse z danego elementu
test.only <-- żeby wykonać konkretny test

## LEKCJA 3

.fill <- od razu focusuje sie na elemencie więc nie trzeba robić .click wcześniej , można tak przyśpieszyć test
Lokator(jak odnajdujemy element) a selektor (adres elementu) np. getByTestId('login-input')
#widget_1_transfer_receiver <- # to selektor w css który w zasadzie oznacza id przykład await page.locator('#widget_1_transfer_receiver').selectOption('2');

- oczyszczamy nadmiarowe .click
- uzywamy różnych locatorw , teraz np
  w playwright : getTestById('test_element');
  na stronie data-testId = 'test_element'
  potem playwright szuka po role ,czyli getByRole a potem locator np id typu css
  testing CSS selectors in Console: $$('selector')

## LEKCJA 4

ctr+shift+r <-- tworzymy zmienną userId ze sztywnej wartości .fill(userId);
alt + strzałka w górę <- przenosimy wyżej

// z lekci o prritier

# Test Automation training from jaktestowac.pl

This is a Test Automation project based on `Playwright` and `TypeScript`. The tested page is a simple demo of a bank.

## Links

- course https://jaktestowac.pl/course/playwright-wprowadzenie/
- test site https://demo-bank.vercel.app/  
  if link is broken check https://jaktestowac.pl/lesson/pw1s01l01/
- code repository https://github.com/jaktestowac/playwright_automatyzacja_wprowadzenie

## Commands

- check `NodeJS` version  
  `node -v`
- new project with Playwright  
  `npm init playwright@latest`
- record tests for given site  
  `npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI  
  `npx playwright test`
- run tests with browser GUI  
  `npx playwright test --headed`
- view report  
  `npx playwright show-report`
- run Trace Viewer on zip file
  `npx playwright show-trace trace.zip`

### Updating Playwright

- check if Playwright should be updated  
  `npm outdated @playwright/test`
- update Playwright  
  `npm i @playwright/test`
- update browsers  
  `npx playwright install`
- verify Playwright version  
  `npx @playwright/test --version`

## Visual Studio Code

### Functions

- Preview: for README.md
- Autosave: in File -> Auto Save
- Timeline: file context menu -> Open Timeline
- Formatting: editor -> context menu -> Format Document
- Searching: editor -> <kbd>CTRL</kbd> + <kbd>F</kbd>
- Accept hint in editor: <kbd>Enter</kbd>
- Comment/Uncomment: <kbd>Ctrl</kbd> + <kbd>/</kbd>
- Duplicate line: <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>↑</kbd>
- Use more than one terminal: <kbd>+</kbd> button in TERMINAL
- Cancelling Node process: hit twice <kbd>Ctrl</kbd> + <kbd>C</kbd>
- Extract to variable: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd>
- Move line i.e. up: <kbd>Alt</kbd> + <kbd>↑</kbd>

## Extensions

- GitLens - view details of your repository i.e. commits history
- Prettier - default formatter for editor

## Playwright

### Playwright Config modifications

- config file `playwright.config.ts`
- disable browsers, i.e. Firefox
  ```javascript
  // {
  //   name: 'firefox',
  //   use: {
  //     ...devices['Desktop Firefox'],
  //   },
  // },
  ```
- enable video on fail
  ```javascript
  use: {
      video: {'retain-on-failure'},
  },
  ```
- enable Trace Viewer on fial
  ```javascript
  use: {
      trace: {'retain-on-failure'},
  },
  ```

### Playwright snippets

- import:
  ```typescript
  import { test, expect } from '@playwright/test';
  ```
- test:
  ```typescript
  test('test description', async ({ page }) => {
    //your code
  });
  ```
- describe:
  ```typescript
  test.describe('Group description', () => {
    //your code
  });
  ```
- running given test: `test.only`

### Locators

- `getByTestId` i.e. `getByTestId('login-input')` for element with `data-testid="login-input"`
- `getByRole` i.e. `getByRole('button', { name: 'wykonaj' })`
- `locator` i.e. `locator('#some-id')` (with `css` selector) for element with attribute `id="some-id"`

## Other

### Chrome

- use English version!
- open DevTools <kbd>F12</kbd> or right click `Inspect`
- get selector: right click on element -> Copy -> Copy selector
- testing CSS selectors in Console: `$$('selector')`

### Prettier

- install Prettier  
  `npm install --save-dev --save-exact prettier`
- configure Prettier
  - exlude files in `.prettierignore`

    ```
    package-lock.json
    playwright-report

    ```

  - set rules in `.prettierrc.json`
    ```
    {
        "singleQuote": true
    }
    ```

- run Prettier  
  `npx prettier --write .`
- additionaly you can install VSC extension: **Prettier**
