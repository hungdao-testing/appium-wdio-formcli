import AndroidDatePicker from "../components/AndroidDatePicker.comp";
import AndroidDropdown from "../components/AndroidDropdown.comp";
import IOSDropdown from "../components/IOSDropdown.comp";
import { elementHelper } from "../helpers/element";
import { locatorHelper } from "../helpers/locator";
import CheckoutFlow from "./checkout-flow.page";
import { $, driver } from "@wdio/globals";

const SCREEN_SELECTOR = {
  fullName: {
    android: 'new UiSelector().resourceId("fullName-content")',
    ios: "fullName-content",
  },
  fullNameLabel: {
    android: 'new UiSelector().text("Full Name")',
    ios: '**/XCUIElementTypeStaticText[`name == "Full Name"`][2]',
  },
  address: {
    android: 'new UiSelector().resourceId("address-content")',
    ios: "address-content",
  },
  addressLabel: {
    android: 'new UiSelector().text("Address")',
    ios: '**/XCUIElementTypeStaticText[`name == "Address"`][2]',
  },
  city: {
    android: 'new UiSelector().resourceId("city-content")',
    ios: "city-content",
  },
  cityLabel: {
    android: 'new UiSelector().text("City")',
    ios: '**/XCUIElementTypeStaticText[`name == "City"`][2]',
  },
  postCode: {
    android: 'new UiSelector().resourceId("postCode-content")',
    ios: "postCode-content",
  },
  postCodeLabel: {
    android: 'new UiSelector().text("Post code")',
    ios: '**/XCUIElementTypeStaticText[`name == "Post code"`][2]',
  },
  country: {
    android: 'new UiSelector().resourceId("text_input")',
    ios: "ios_touchable_wrapper",
  },
  countryLabel: {
    android: 'new UiSelector().text("Country")',
    ios: '**/XCUIElementTypeStaticText[`name == "Country"`][2]',
  },
  countryOptionLabel: {
    android: 'new UiSelector().text("option")',
    ios: "",
  },
  phone: {
    android: 'new UiSelector().resourceId("phoneNumber-content")',
    ios: "phoneNumber-content",
  },
  phoneLabel: {
    android: 'new UiSelector().text("Telephone")',
    ios: '**/XCUIElementTypeStaticText[`name == "Telephone"`][2]',
  },
  dob: {
    android: 'new UiSelector().resourceId("dateOfBirth-content")',
    ios: '**/XCUIElementTypeStaticText[`name == "option"`]',
  },
  nextBtn: {
    android: "Next",
    ios: "Next-button",
  },
};

const IOS_DATE_PICKER_SELECTOR = {
  headerDate: "id=android:id/date_picker_header_date",
  headerYear: "id=android:id/date_picker_header_year",
  yearOption: 'new UiSelector().text("option")',
  dayOption: 'new UiSelector().text("option")',
  okButton: "id=android:id/button1",
  cancelButton: "id=android:id/button2",
};

export default class PersonalTab extends CheckoutFlow {
  private fullName: string;
  private fullNameLabel: string;

  private address: string;
  private addressLabel: string;

  private city: string;
  private cityLabel: string;

  private country: string;
  private countryLabel: string;
  private countryOptionLabel: string;

  private postCode: string;
  private postCodeLabel: string;

  private phone: string;
  private phoneLabel: string;

  private dob: string;
  private nextBtn: string;

  constructor() {
    super();
    this.fullName = locatorHelper.generateSelector(
      SCREEN_SELECTOR.fullName[this.platform]
    );

    this.fullNameLabel = locatorHelper.generateSelector(
      SCREEN_SELECTOR.fullNameLabel[this.platform],
      "class_chain"
    );

    this.address = locatorHelper.generateSelector(
      SCREEN_SELECTOR.address[this.platform]
    );
    this.addressLabel = locatorHelper.generateSelector(
      SCREEN_SELECTOR.addressLabel[this.platform],
      "class_chain"
    );

    this.city = locatorHelper.generateSelector(
      SCREEN_SELECTOR.city[this.platform]
    );
    this.cityLabel = locatorHelper.generateSelector(
      SCREEN_SELECTOR.cityLabel[this.platform],
      "class_chain"
    );

    this.country = locatorHelper.generateSelector(
      SCREEN_SELECTOR.country[this.platform]
    );
    this.countryLabel = locatorHelper.generateSelector(
      SCREEN_SELECTOR.countryLabel[this.platform],
      "class_chain"
    );
    this.countryOptionLabel = locatorHelper.generateSelector(
      SCREEN_SELECTOR.countryOptionLabel[this.platform]
    );

    this.postCode = locatorHelper.generateSelector(
      SCREEN_SELECTOR.postCode[this.platform]
    );
    this.postCodeLabel = locatorHelper.generateSelector(
      SCREEN_SELECTOR.postCodeLabel[this.platform],
      "class_chain"
    );

    this.phone = locatorHelper.generateSelector(
      SCREEN_SELECTOR.phone[this.platform]
    );
    this.phoneLabel = locatorHelper.generateSelector(
      SCREEN_SELECTOR.phoneLabel[this.platform],
      "class_chain"
    );

    this.dob = locatorHelper.generateSelector(
      SCREEN_SELECTOR.dob[this.platform]
    );
    this.nextBtn = locatorHelper.generateSelector(
      SCREEN_SELECTOR.nextBtn[this.platform]
    );
  }

  public async isAt() {
    super.isAt();
    await Promise.all([
      $(this.fullNameLabel).waitForDisplayed(),
      $(this.addressLabel).waitForDisplayed(),
      $(this.cityLabel).waitForDisplayed(),
      $(this.countryLabel).waitForDisplayed(),
      $(this.phoneLabel).waitForDisplayed(),
      $(this.postCodeLabel).waitForDisplayed(),
    ]);
    return true;
  }

  public async setFullName(value: string) {
    // await $(this.fullName).setValue(value);
    await this.setValueToInputField(this.fullName, value);
  }

  public async getFullName() {
    return this.getContentOfInputField(this.fullName);
  }

  public async setAddress(value: string) {
    await this.setValueToInputField(this.address, value);
  }

  public async getAddress() {
    return this.getContentOfInputField(this.address);
  }

  public async setCity(value: string) {
    await this.setValueToInputField(this.city, value);
  }

  public async getCity() {
    return this.getContentOfInputField(this.city);
  }

  public async setPostCode(value: string) {
    await this.setValueToInputField(this.postCode, value);
  }

  public async getPostCode() {
    return this.getContentOfInputField(this.postCode);
  }

  public async setPhone(value: string) {
    await this.setValueToInputField(this.phone, value);
  }

  public async getPhone() {
    return this.getContentOfInputField(this.phone);
  }

  private async openCountryFieldInAndroid() {
    await $(this.country).click();
  }

  private async openCountryFieldInIOS() {
    const bounds = await elementHelper.getBoundOfElement(this.country);
    await driver
      .action("pointer", {
        parameters: { pointerType: "touch" },
      })
      .move({
        x: bounds.right - 5,
        y: bounds.bottom - 5,
      })
      .perform();
  }

  private async openDobFieldInAndroid() {
    await $(this.dob).click();
    await AndroidDatePicker.waitUntilDatePickerLoaded();
  }

  private async selectDobInAndroid(day: number, month: number, year: number) {
    await AndroidDatePicker.yearPicker(year);
    await AndroidDatePicker.monthPicker(month);
    await AndroidDatePicker.dayPicker(day);
    await AndroidDatePicker.submitDate();
  }

  private async openDobFieldInIOS() {
    await $(this.dob).click();
  }

  private async setCountryInAndroid(value: string) {
    let currentText = await this.getCountry();
    if (currentText.includes("Select a country")) {
      currentText = "A";
    }
    await this.openCountryFieldInAndroid();
    await AndroidDropdown.scrollToSelect(currentText, value);
  }

  private async setCountryInIos(value: string) {
    let currentText = await this.getCountry();
    if (currentText.includes("Select a country")) {
      currentText = "A";
    }
    await this.openCountryFieldInIOS();
    await IOSDropdown.scrollToSelect(currentText, value);
  }

  public async setCountry(value: string) {
    if (driver.isAndroid) {
      await this.setCountryInAndroid(value);
    } else {
      await this.setCountryInIos(value);
    }
  }

  public async getCountry() {
    return this.getContentOfInputField(this.country);
    // if(this.platform === 'ios'){
    //   return $(this.country).getAttribute('label')
    // }
    // else{
    //   return $(this.country).getAttribute('text')
    // }
  }

  /**
   *
   * @param day {number} day
   * @param month {number} month
   * @param year {number} year
   */
  public async setDob(day: number, month: number, year: number) {
    if (this.platform === "android") {
      await this.openDobFieldInAndroid();
      await this.selectDobInAndroid(day, month, year);
    } else {
      await this.openCountryFieldInIOS();
    }
  }

  public async getDob() {
    return this.getContentOfInputField(this.dob);
  }

  public async submit() {
    await $(this.nextBtn).click();
  }
}
