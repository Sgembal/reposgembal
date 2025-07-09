import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu-component';

export class PaymentPage {
  transferReciever: Locator;
  formAccountTo: Locator;
  formAmount: Locator;
  closeButton: Locator;
  showMessage: Locator;
  sideMenuComponent: SideMenuComponent;

  constructor(private page: Page) {
    this.sideMenuComponent = new SideMenuComponent(this.page);

    this.transferReciever = this.page.getByTestId('transfer_receiver');
    this.formAccountTo = this.page.getByTestId('form_account_to');
    this.formAmount = this.page.getByTestId('form_amount');
    this.closeButton = this.page.getByTestId('close-button');
    this.showMessage = this.page.locator('#show_messages');
  }
}
