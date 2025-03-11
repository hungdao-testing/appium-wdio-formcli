import Page from "./page";

const SCREEN_SELECTOR = {
  personalTitle: {
    android: 'new UiSelector().text("Personal")',
    ios: "",
  },
  paymentTitle: {
    android: 'new UiSelector().text("Payment")',
    ios: "",
  },
  summaryTitle: {
    android: 'new UiSelector().text("Comfirmation")',
    ios: "",
  },
};
export default abstract class CheckoutFlow extends Page {
  private personalTitle: string;
  private paymentTitle: string;
  private summaryTitle: string;

  constructor() {
    super();
    this.personalTitle = this.generateSelector(
      SCREEN_SELECTOR.personalTitle[this.platform]
    );
    this.paymentTitle = this.generateSelector(
      SCREEN_SELECTOR.paymentTitle[this.platform]
    );
    this.summaryTitle = this.generateSelector(
      SCREEN_SELECTOR.summaryTitle[this.platform]
    );
  }

  public async isAt() {
    await Promise.all([
      $(this.personalTitle).waitForDisplayed(),
      $(this.paymentTitle).waitForDisplayed(),
      $(this.summaryTitle).waitForDisplayed(),
    ]);
    return true;
  }
}
