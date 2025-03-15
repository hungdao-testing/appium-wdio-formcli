import { $, driver } from "@wdio/globals";
import { locatorHelper } from "../helpers/locator";
import { swipeAction } from "../mobileAction/swipe";

export default class AndroidDatePicker {
  private static prevMonthBtn =
    locatorHelper.generateSelector("Previous month");
  private static nextMonthBtn = locatorHelper.generateSelector("Next month");
  private static headerYear = locatorHelper.generateSelector(
    "id=android:id/date_picker_header_year"
  );
  private static headerDate = locatorHelper.generateSelector(
    "id=android:id/date_picker_header_date"
  );
  private static yearOption = locatorHelper.generateSelector(
    'new UiSelector().text("option")'
  );
  private static dayOption = locatorHelper.generateSelector(
    'new UiSelector().text("option")'
  );
  private static okButton = locatorHelper.generateSelector(
    "id=android:id/button1"
  );
  private static cancelButton = locatorHelper.generateSelector(
    "id=android:id/button2"
  );

  static async waitUntilDatePickerLoaded() {
    await $(AndroidDatePicker.headerDate).waitForDisplayed();
  }

  static async monthPicker(month: number) {
    let directionSelector;
    let headerDate = await $(AndroidDatePicker.headerDate).getText();
    let currentDisplayedMonth = new Date(headerDate).getMonth() + 1;
    if (currentDisplayedMonth === month) return;

    if (currentDisplayedMonth > month) {
      directionSelector = AndroidDatePicker.prevMonthBtn;
    } else {
      directionSelector = AndroidDatePicker.nextMonthBtn;
    }

    let numberOfClicks = Math.abs(month - currentDisplayedMonth);

    for (let i = 0; i < numberOfClicks; i++) {
      await $(directionSelector).click();
    }
  }

  static async yearPicker(year: number) {
    //open year modal
    await $(AndroidDatePicker.headerYear).click();
    //set swipe direction
    const currentYear = new Date().getFullYear();
    const direction = swipeAction.setVerticalDirectionBy(currentYear, year);

    //build locator for input year
    const selectYearSelector = AndroidDatePicker.yearOption.replace(
      "option",
      year.toString()
    );
    // swipe until see year in modal and click
    await swipeAction.swipeUntilSeeElement(selectYearSelector, {
      direction: direction!,
      duration: 500
    });

    await $(selectYearSelector).click();

    //wait for selected year loaded.
    (await driver.waitUntil(
      async () => await $(AndroidDatePicker.headerYear).getText()
    )) === year.toString();
  }

  static async dayPicker(day: number) {
    await $(
      AndroidDatePicker.dayOption.replace("option", day.toString())
    ).click();
  }

  static async submitDate() {
    await $(AndroidDatePicker.okButton).click();
  }

  static async closePicker() {
    await $(AndroidDatePicker.cancelButton).click();
  }
}
