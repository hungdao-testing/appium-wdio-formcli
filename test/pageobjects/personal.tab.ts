import AndroidDatePicker from "../components/AndroidDatePicker.comp";
import AndroidDropdown from "../components/AndroidDropdown.comp";
import CheckoutFlow from "./checkout-flow.page";
import { $, driver } from "@wdio/globals";

const SCREEN_SELECTOR = {
  fullName: {
    android: 'new UiSelector().resourceId("fullName-content")',
    ios: "",
  },
  fullNameLabel: {
    android: 'new UiSelector().text("Full Name")',
    ios: "",
  },
  address: {
    android: 'new UiSelector().resourceId("address-content")',
    ios: "",
  },
  addressLabel: {
    android: 'new UiSelector().text("Address")',
    ios: "",
  },
  city: {
    android: 'new UiSelector().resourceId("city-content")',
    ios: "",
  },
  cityLabel: {
    android: 'new UiSelector().text("City")',
    ios: "",
  },
  postCode: {
    android: 'new UiSelector().resourceId("postCode-content")',
    ios: "",
  },
  postCodeLabel: {
    android: 'new UiSelector().text("Post code")',
    ios: "",
  },
  country: {
    android: 'new UiSelector().resourceId("text_input")',
    ios: "",
  },
  countryLabel: {
    android: 'new UiSelector().text("Country")',
    ios: "",
  },
  countryOptionLabel: {
    android: 'new UiSelector().text("option")',
    ios: "",
  },
  phone: {
    android: 'new UiSelector().resourceId("phoneNumber-content")',
    ios: "",
  },
  phoneLabel: {
    android: 'new UiSelector().text("Telephone")',
    ios: "",
  },
  dob: {
    android: 'new UiSelector().resourceId("dateOfBirth-content")',
    ios: "",
  },
  nextBtn: {
    android: "Next",
    ios: "",
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
    this.fullName = this.generateSelector(
      SCREEN_SELECTOR.fullName[this.platform]
    );

    this.fullNameLabel = this.generateSelector(
      SCREEN_SELECTOR.fullNameLabel[this.platform]
    );

    this.address = this.generateSelector(
      SCREEN_SELECTOR.address[this.platform]
    );
    this.addressLabel = this.generateSelector(
      SCREEN_SELECTOR.addressLabel[this.platform]
    );

    this.city = this.generateSelector(SCREEN_SELECTOR.city[this.platform]);
    this.cityLabel = this.generateSelector(
      SCREEN_SELECTOR.cityLabel[this.platform]
    );

    this.country = this.generateSelector(
      SCREEN_SELECTOR.country[this.platform]
    );
    this.countryLabel = this.generateSelector(
      SCREEN_SELECTOR.countryLabel[this.platform]
    );
    this.countryOptionLabel = this.generateSelector(
      SCREEN_SELECTOR.countryOptionLabel[this.platform]
    );

    this.postCode = this.generateSelector(
      SCREEN_SELECTOR.postCode[this.platform]
    );
    this.postCodeLabel = this.generateSelector(
      SCREEN_SELECTOR.postCodeLabel[this.platform]
    );

    this.phone = this.generateSelector(SCREEN_SELECTOR.phone[this.platform]);
    this.phoneLabel = this.generateSelector(
      SCREEN_SELECTOR.phoneLabel[this.platform]
    );

    this.dob = this.generateSelector(SCREEN_SELECTOR.dob[this.platform]);
    this.nextBtn = this.generateSelector(
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
    await $(this.fullName).setValue(value);
  }

  public async getFullName() {
    return $(this.fullName).getAttribute("text");
  }

  public async setAddress(value: string) {
    await $(this.address).setValue(value);
  }

  public async getAddress() {
    return $(this.address).getAttribute("text");
  }

  public async setCity(value: string) {
    await $(this.city).setValue(value);
  }

  public async getCity() {
    return $(this.city).getAttribute("text");
  }

  public async setPostCode(value: string) {
    await $(this.postCode).setValue(value);
  }

  public async getPostCode() {
    return $(this.postCode).getAttribute("text");
  }

  public async setPhone(value: string) {
    await $(this.phone).setValue(value);
  }

  public async getPhone() {
    return $(this.phone).getAttribute("text");
  }

  private async openCountryFieldInAndroid() {
    await $(this.country).click();
  }

  private async openCountryFieldInIOS() {
    await $(this.country).click();
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
    await this.openCountryFieldInIOS()
  }

  public async setCountry(value: string) {
    if (driver.isAndroid) {
      await this.setCountryInAndroid(value);
    } else {
      await this.setCountryInIos(value);
    }
  }

  public async getCountry() {
    const country = await $(this.country).getAttribute("text");
    return country;
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
    const dob = await $(this.dob).getAttribute("text");
    return dob;
  }

  public async submit() {
    await $(this.nextBtn).click();
  }
}
