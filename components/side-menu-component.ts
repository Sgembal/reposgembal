import { Locator, Page } from '@playwright/test';

export class SideMenuComponent {
  menuButton: Locator;

  constructor(private page: Page) {
    this.menuButton = this.page.getByRole('link', { name: 'płatności' });
  }
}
