import { locatorHelper } from "../helpers/locator";
import CheckoutFlow from "./checkout-flow.page";

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
  cardNumber: {
    android: "",
    ios: "cardNumber-content",
  },

  expiredDate: {
    android: "",
    ios: "expireDate-content",
  },

  cvv: {
    android: "",
    ios: "cvv-content",
  },

  creditCard: {
    android: "",
    ios: "saveCard-checkbox",
  },
  creditCardLabel: {
    android: "",
    ios: '**/XCUIElementTypeStaticText[`name == "Save Credit Card"`][2]',
  },
};

export default class PaymentTab extends CheckoutFlow {
  private cardNumber: string;
  private cardNumberLabel: string;
  private expiredDate: string;
  private expiredDateLabel: string;
  private creditCard: string;
  private creditCardLabel: string;

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
  }

  public async isAt() {
    super.isAt();
    await Promise.all([
      $(this.cardNumberLabel).waitForDisplayed(),
      $(this.expiredDateLabel).waitForDisplayed(),
      $(this.creditCardLabel).waitForDisplayed(),
    ]);
    return true;
  }

  public async getCardNumber(){
    return this.getContentOfInputField(this.cardNumber);
  }
  public async setCardNumber(value: string){
    await this.setValueToInputField(this.cardNumber, value);
  }
  public async getCExpiredDate(){
    return this.getContentOfInputField(this.expiredDate);
  }
  public async setExpiredDate(value: string){
    await this.setValueToInputField(this.expiredDate, value);
  }
  private async getCreditCardBoxInIOS(){
    const value = await this.getContentOfInputField(this.cardNumber);
    if(value === 'checkbox, unchecked, off'){
        return false;
    }
    return true;
  }

  private async getCreditCardBoxInAndroid(){
    return true;
  }

  public async getCreditCardBox(){
    if(this.platform === 'ios'){
        return this.getCreditCardBoxInIOS();
    }else{
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
  public async setCreditCardBox(isChecked: boolean){
    if(isChecked && !await this.getCreditCardBox()){
        await $(this.creditCard).click();
    }else if(!isChecked && await this.getCreditCardBox()){
        await $(this.creditCard).click();
    }
  }
}
