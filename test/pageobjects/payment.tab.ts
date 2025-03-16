import { locatorHelper } from "../helpers/locator";
import CheckoutFlow from "./checkout-flow.page";
import { $, driver } from "@wdio/globals";

const SCREEN_SELECTOR = {
  cardNumber: {
    android: 'new UiSelector().resourceId("cardNumber-content")',
    ios: "cardNumber-content",
  },
  cardNumberLabel: {
    android: 'new UiSelector().text("Card Number")',
    ios: '**/XCUIElementTypeStaticText[`name == "Card Number"`][2]',
  },
  expiredDate: {
    android: 'new UiSelector().resourceId("expireDate-content")',
    ios: "expireDate-content",
  },
  expiredDateLabel: {
    android: 'new UiSelector().text("Expire Date")',
    ios: '**/XCUIElementTypeStaticText[`name == "Expire Date"`][2]',
  },
  cvv: {
    android: 'new UiSelector().resourceId("cvv-content")',
    ios: "cvv-content",
  },
  cvvLabel: {
    android: 'new UiSelector().text("CVV")',
    ios: '**/XCUIElementTypeStaticText[`name == "CVV"`][2]',
  },
  creditCard: {
    android: 'new UiSelector().resourceId("saveCard-checkbox")',
    ios: "saveCard-checkbox",
  },
  creditCardLabel: {
    android: 'new UiSelector().text("Save Credit Card")',
    ios: '**/XCUIElementTypeStaticText[`name == "Save Credit Card"`][2]',
  },

  nextBtn: {
    android: "Next",
    ios: "Next-button",
  },
};

const errorFieldLabels = {
  android: {
    cardNumber: 'new UiSelector().resourceId("cardNumber-errorMsg")',
    expiredDate: 'new UiSelector().resourceId("expireDate-errorMsg")',
    cvv: 'new UiSelector().resourceId("cvv-errorMsg")',
  },
  ios: {
    cardNumber: "cardNumber-errorMsg",
    expiredDate: "expireDate-errorMsg",
    cvv: "cvv-errorMsg",
  },
};

export default class PaymentTab extends CheckoutFlow {
  private cardNumber: string;
  private cardNumberLabel: string;
  private expiredDate: string;
  private expiredDateLabel: string;
  private creditCard: string;
  private creditCardLabel: string;
  private cvv: string;
  private cvvLabel: string;
  private nextBtn: string;

  constructor() {
    super();
    this.cardNumber = locatorHelper.generateSelector(
      SCREEN_SELECTOR.cardNumber[this.platform],
      "accessibility_id"
    );
    this.cardNumberLabel = locatorHelper.generateSelector(
      SCREEN_SELECTOR.cardNumberLabel[this.platform],
      "class_chain"
    );
    this.expiredDate = locatorHelper.generateSelector(
      SCREEN_SELECTOR.expiredDate[this.platform],
      "accessibility_id"
    );
    this.expiredDateLabel = locatorHelper.generateSelector(
      SCREEN_SELECTOR.expiredDateLabel[this.platform],
      "class_chain"
    );
    this.creditCard = locatorHelper.generateSelector(
      SCREEN_SELECTOR.creditCard[this.platform],
      "accessibility_id"
    );
    this.creditCardLabel = locatorHelper.generateSelector(
      SCREEN_SELECTOR.creditCardLabel[this.platform],
      "class_chain"
    );

    this.cvv = locatorHelper.generateSelector(
      SCREEN_SELECTOR.cvv[this.platform],
      "accessibility_id"
    );
    this.cvvLabel = locatorHelper.generateSelector(
      SCREEN_SELECTOR.cvvLabel[this.platform],
      "class_chain"
    );
    this.nextBtn = locatorHelper.generateSelector(
      SCREEN_SELECTOR.nextBtn[this.platform]
    );
  }

  public async isAt() {
    super.isAt();
    await Promise.all([
      $(this.cardNumberLabel).waitForDisplayed(),
      $(this.expiredDateLabel).waitForDisplayed(),
      $(this.creditCardLabel).waitForDisplayed(),
      $(this.cvvLabel).waitForDisplayed(),
    ]);
    return true;
  }

  public async getCardNumber() {
    return this.getContentOfInputField(this.cardNumber);
  }
  public async setCardNumber(value: string) {
    await this.setValueToInputField(this.cardNumber, value);
  }
  public async getExpiredDate() {
    return this.getContentOfInputField(this.expiredDate);
  }
  public async setExpiredDate(value: string) {
    await this.setValueToInputField(this.expiredDate, value);
  }
  private async getCreditCardBoxInIOS() {
    const value = await this.getContentOfInputField(this.creditCard);
    if (value === "checkbox, unchecked, off") {
      return false;
    }
    return true;
  }

  private async getCreditCardBoxInAndroid() {
    const contentDesc = await $(this.creditCard).getAttribute("content-desc");
    return contentDesc === "off" ? false : true;
  }

  public async getCreditCardBox() {
    if (this.platform === "ios") {
      return this.getCreditCardBoxInIOS();
    } else {
      return this.getCreditCardBoxInAndroid();
    }
  }
  /**
   * @description Check and uncheck the `Save Credit Card` check-box based on the `isCheck` value
   *
   * If `isCheck == true` => make sure the check-box is ticked
   *
   * If `isCheck == false` => make sure the check-box is unticked
   * @param {boolean} isChecked
   */
  public async setCreditCardBox(isChecked: boolean) {
    if (isChecked && !(await this.getCreditCardBox())) {
      await $(this.creditCard).click();
    } else if (!isChecked && (await this.getCreditCardBox())) {
      await $(this.creditCard).click();
    }
  }

  public async getCvv() {
    return this.getContentOfInputField(this.cvv);
  }

  public async setCvv(cvv: string) {
    await this.setValueToInputField(this.cvv, cvv);
  }

  public async submit() {
    await $(this.nextBtn).click();
  }

  public async getErrorMessageOnField(
    fieldName: keyof (typeof errorFieldLabels)["android" | "ios"]
  ) {
    return this.getContentOfInputField(
      errorFieldLabels[this.platform][fieldName]
    );
  }
}
