import { locatorHelper } from "../helpers/locator";
import { PaymentInfo, PersonalInfo } from "../type";
import Page from "./page";
import { $, driver, expect } from "@wdio/globals";

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
      main: 'new UiSelector().resourceId("personalInfo")',
      editBtn: 'new UiSelector().resourceId("editPersonal")',
    },
    paymentCard: {
      main: 'new UiSelector().resourceId("paymentInfo")',
      editBtn: 'new UiSelector().resourceId("editPayment")',
    },
    submitBtn: "Submit",
  },
};

export default class SummaryTab extends Page {
  private personalCard: string;
  private paymentCard: string;
  private editBtnInPersonalCard: string;
  private editBtnInPaymentCard: string;
  private submitBtn: string;

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
      SCREEN_SELECTOR[this.platform].personalCard.editBtn, 'class_chain'
    );
    this.editBtnInPaymentCard = locatorHelper.generateSelector(
      SCREEN_SELECTOR[this.platform].paymentCard.editBtn, 'class_chain'
    );
    this.submitBtn = locatorHelper.generateSelector(
      SCREEN_SELECTOR[this.platform].submitBtn,
      "accessibility_id"
    );
  }

  public async getInfoInPersonalCard(infoType: keyof PersonalInfo) {
    if (this.platform === "ios") {
      const label = await $(
        locatorHelper.generateSelector(
          `**/XCUIElementTypeStaticText[\`name CONTAINS "${infoType}"\`][1]`,
          "class_chain"
        )
      ).getAttribute("label");
      return label.split(":")[1].trim();
    } else {
      const txt = await $(
        locatorHelper.generateSelector(
          `new UiSelector().textContains("${infoType}")`
        )
      ).getAttribute("text");
      return txt.split(":")[1].trim();
    }
  }

  public async getInfoInPaymentCard(infoType: keyof PaymentInfo) {
    if (this.platform === "ios") {
      const label = await $(
        locatorHelper.generateSelector(
          `**/XCUIElementTypeStaticText[\`name CONTAINS "${infoType}"\`][1]`,
          "class_chain"
        )
      ).getAttribute("label");
      return label.split(":")[1].trim();
    } else {
      const txt = await $(
        locatorHelper.generateSelector(
          `new UiSelector().textContains("${infoType}")`
        )
      ).getAttribute("text");
      return txt.split(":")[1].trim();
    }
  }

  private async assertPersonalInfoLoaded() {
    expect(await this.getInfoInPersonalCard("fullName")).toBe(
      this.personalInfo.fullName
    );
    expect(await this.getInfoInPersonalCard("address")).toBe(
      this.personalInfo.address
    );
    expect(await this.getInfoInPersonalCard("city")).toBe(
      this.personalInfo.city
    );
    expect([
      this.personalInfo.country.code,
      this.personalInfo.country.name,
    ]).toContain(await this.getInfoInPersonalCard("country"));

    expect(await this.getInfoInPersonalCard("phoneNumber")).toBe(
      this.personalInfo.phoneNumber
    );
    expect(await this.getInfoInPersonalCard("phoneNumber")).toBe(
      this.personalInfo.phoneNumber
    );
    expect(await this.getInfoInPersonalCard("dateOfBirth")).toBe(
      this.expectedForDob({
        day: this.personalInfo.dateOfBirth.day,
        month: this.personalInfo.dateOfBirth.month,
        year: this.personalInfo.dateOfBirth.year,
      })
    );
  }

  private async assertPaymentInfoLoaded() {
    expect(await this.getInfoInPaymentCard("cardNumber")).toBe(
      this.paymentInfo.cardNumber
    );
    expect(await this.getInfoInPaymentCard("cvv")).toBe(this.paymentInfo.cvv);
    expect(await this.getInfoInPaymentCard("expireDate")).toBe(
      this.paymentInfo.expireDate
    );
    expect(await this.getInfoInPaymentCard("saveCard")).toBe(
      `${this.paymentInfo.saveCard}`
    );
  }

  public async isAt() {
    await Promise.all([
      $(this.personalCard).waitForDisplayed(),
      $(this.paymentCard).waitForDisplayed(),
      this.assertPaymentInfoLoaded(),
      this.assertPersonalInfoLoaded(),
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
