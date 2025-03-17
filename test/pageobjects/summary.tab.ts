import { locatorHelper } from "../helpers/locator";
import { PaymentInfo, PersonalInfo } from "../type";
import Page from "./page";
import PaymentTab from "./payment.tab";
import PersonalTab from "./personal.tab";
import { $, driver } from "@wdio/globals";

const SCREEN_SELECTOR = {
  ios: {
    personalCard: {
      main: "personalInfo",
      editBtn: '**/XCUIElementTypeStaticText[`name == "Edit"`][1]',
    },
    paymentCard: {
      main: "paymentInfo",
      editBtn: '**/XCUIElementTypeStaticText[`name == "Edit"`][2]',
    },
    submitBtn: "Submit-button",
  },
  android: {
    personalCard: {
      main: "personalInfo",
      editBtn: '**/XCUIElementTypeStaticText[`name == "Edit"`][1]',
    },
    paymentCard: {
      main: "paymentInfo",
      editBtn: '**/XCUIElementTypeStaticText[`name == "Edit"`][2]',
    },
    submitBtn: "Submit-button",
  },
};



export default class SummaryTab extends Page {
  private personalCard: string;
  private paymentCard: string;
  private editBtnInPersonalCard: string;
  private editBtnInPaymentCard: string;
  private submitBtn: string;

  private personalTab: PersonalTab;
  private paymentTab: PaymentTab;

  constructor(
    private personalInfo: PersonalInfo,
    private paymentInfo: PaymentInfo
  ) {
    super();
    this.personalCard = locatorHelper.generateSelector(
      SCREEN_SELECTOR[this.platform].personalCard.main
    );
    this.paymentCard = locatorHelper.generateSelector(
      SCREEN_SELECTOR[this.platform].paymentCard.main,
      "accessibility_id"
    );
    this.editBtnInPersonalCard = locatorHelper.generateSelector(
      SCREEN_SELECTOR[this.platform].personalCard.editBtn
    );
    this.editBtnInPaymentCard = locatorHelper.generateSelector(
      SCREEN_SELECTOR[this.platform].paymentCard.editBtn
    );
    this.submitBtn = locatorHelper.generateSelector(
      SCREEN_SELECTOR[this.platform].submitBtn,
      "accessibility_id"
    );

    this.personalTab = new PersonalTab();
    this.paymentTab = new PaymentTab();
  }

  public async getInfoInPersonalCard(infoType: keyof PersonalInfo) {
    if (this.platform === "ios") {
      const label = await $(
        locatorHelper.generateSelector(
          `**/XCUIElementTypeStaticText['name CONTAINS "${infoType}"'][0]`,
          "class_chain"
        )
      ).getAttribute("label");
      return label.split(":")[1].trim();
    }
  }

  public async getInfoInPaymentCard(infoType: keyof PaymentInfo) {
    if (this.platform === "ios") {
      const label = await $(
        locatorHelper.generateSelector(
          `**/XCUIElementTypeStaticText['name CONTAINS "${infoType}"'][0]`,
          "class_chain"
        )
      ).getAttribute("label");
      return label.split(":")[1].trim();
    }
  }

  public async isAt() {
    await Promise.all([
      $(this.personalCard).waitForDisplayed(),
      $(this.paymentCard).waitForDisplayed(),
    ]);
    return true;
  }

  private async editPersonal() {
    $(this.editBtnInPersonalCard).click();
  }

  private async editPayment() {
    $(this.editBtnInPaymentCard).click();
  }
  public async editOnCard(cardName: "payment" | "personal") {
    if (cardName === "personal") {
      await this.editPersonal();
    } else {
      await this.editPayment();
    }
  }

  public async submit() {
    await $(this.submitBtn).click();
  }
}
