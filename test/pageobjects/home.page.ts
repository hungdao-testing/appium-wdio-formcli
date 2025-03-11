import { $ } from "@wdio/globals";
import Page from "./page";

const SCREEN_SELECTOR = {
  title: {
    ios: 'name == "HomeScreen" AND label == "HomeScreen"',
    android: 'new UiSelector().text("HomeScreen")',
  },

  checkoutBtn: {
    ios: "Checkout",
    android: "Checkout",
  },
};
export default class HomePage extends Page {
  protected title: string;
  protected checkOutBtn: string;

  constructor() {
    super();
    this.title = this.generateSelector(
      SCREEN_SELECTOR.title[this.platform]
    );
    this.checkOutBtn = this.generateSelector(
      SCREEN_SELECTOR.checkoutBtn[this.platform]
    );
  }

  public async isAt() {
    await $(this.title).waitForDisplayed();
    return true;
  }

  public async openCheckOut() {
    await $(this.checkOutBtn).waitForDisplayed();
    await $(this.checkOutBtn).click();
  }
}
