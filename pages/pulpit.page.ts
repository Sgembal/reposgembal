import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu-component';

export class PulpitPage {
  widgetTransferReceiver: Locator;
  widgetTransferAmount: Locator;
  widgetTransferTitle: Locator;
  executeButton: Locator;
  closeButton: Locator;
  showMessage: Locator;
  widgetTopupReciever: Locator;
  widgetTopupAmount: Locator;
  uniformWidget: Locator;
  moneyValue: Locator;
  messageText: Locator;
  sideMenuComponent: SideMenuComponent;
  topUpPhoneButton: Locator;

  constructor(private page: Page) {
    this.sideMenuComponent = new SideMenuComponent(this.page);

    this.widgetTransferReceiver = this.page.locator(
      '#widget_1_transfer_receiver'
    );
    this.widgetTransferAmount = this.page.locator('#widget_1_transfer_amount');
    this.widgetTransferTitle = this.page.locator('#widget_1_transfer_title');
    this.executeButton = this.page.locator('#execute_btn');
    this.closeButton = this.page.getByTestId('close-button');
    this.showMessage = this.page.locator('#show_messages');
    this.widgetTopupReciever = this.page.locator('#widget_1_topup_receiver');
    this.widgetTopupAmount = this.page.locator('#widget_1_topup_amount');
    this.uniformWidget = this.page.locator(
      '#uniform-widget_1_topup_agreement span'
    );
    this.topUpPhoneButton = this.page.getByRole('button', {
      name: 'doładuj telefon',
    });
    this.moneyValue = this.page.locator('#money_value');
    this.messageText = this.page.getByTestId('message-text');
  }
}
