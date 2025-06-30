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
  - otwórz przglądarkę konkretną  `npx playwright codegen https://demo-bank.vercel.app/`
  - uruchom testy `npx playwright test`
  - uruchom testy ale z przeglądarka `npx playwright test --headed`
  - zobacz raport `npx playwright show--report`


1. playwright configuration 
- w pliku playwright.config.ts ---> możemy wyłączyć lub włączyć konkretne przeglądarki

 /* Configure projects for major browsers */
  projects: [
  ```javascript  {
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
#widget_1_transfer_receiver <- # to selektor w css który w zasadzie oznacza id przykład  await page.locator('#widget_1_transfer_receiver').selectOption('2');
- oczyszczamy nadmiarowe .click
- uzywamy różnych locatorw , teraz np 
w playwright :  getTestById('test_element');
na stronie data-testId = 'test_element'
potem playwright szuka po role ,czyli getByRole a potem locator np id  typu css
testing CSS selectors in Console: $$('selector')


## LEKCJA 4

