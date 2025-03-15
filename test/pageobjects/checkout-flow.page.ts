import { locatorHelper } from "../helpers/locator";
import Page from "./page";

const SCREEN_SELECTOR = {
  personalTitle: {
    android: 'new UiSelector().text("Personal")',
    ios: '**/XCUIElementTypeOther[`name == "step-0-testId"`][1]',
  },
  paymentTitle: {
    android: 'new UiSelector().text("Payment")',
    ios: '**/XCUIElementTypeOther[`name == "step-0-testId"`][2]',
  },
  summaryTitle: {
    android: 'new UiSelector().text("Comfirmation")',
    ios: '**/XCUIElementTypeOther[`name == "step-0-testId"`][3]',
  },
};
export default abstract class CheckoutFlow extends Page {
  private personalTitle: string;
  private paymentTitle: string;
  private summaryTitle: string;

  constructor() {
    super();
    this.personalTitle = locatorHelper.generateSelector(
      SCREEN_SELECTOR.personalTitle[this.platform],
      "predicate_string"
    );
    this.paymentTitle = locatorHelper.generateSelector(
      SCREEN_SELECTOR.paymentTitle[this.platform],
      "predicate_string"
    );
    this.summaryTitle = locatorHelper.generateSelector(
      SCREEN_SELECTOR.summaryTitle[this.platform],
      "predicate_string"
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
