import { $$, driver, $ } from "@wdio/globals";
import { locatorHelper } from "../helpers/locator";
import { dateHelper } from "../helpers/date";

export default class IOSDatePicker {
  private static elementTypePicker = locatorHelper.generateSelector(
    "**/XCUIElementTypePickerWheel",
    "class_chain"
  );

  private static confirmBtn = locatorHelper.generateSelector(
    "confirmDateSelectionBtn",
    "accessibility_id"
  );
  private static cancelBtn = locatorHelper.generateSelector(
    "cancelDateSelectionBtn",
    "accessibility_id"
  );

  static async waitUntilDatePickerLoaded() {
    const pickerElements = $$(IOSDatePicker.elementTypePicker);
    await driver.waitUntil(async () => (await pickerElements.length) > 0);
  }

  static async monthPicker(month: number) {
    const monthSelector = await $$(IOSDatePicker.elementTypePicker)[1];

    const expectedMonthInWord = dateHelper.monthInFullWord[month - 1];
    await monthSelector.setValue(expectedMonthInWord);
  }

  static async yearPicker(year: number) {
    const yearSelector = await $$(IOSDatePicker.elementTypePicker)[2];
    await yearSelector.setValue(year);
  }

  static async dayPicker(day: number) {
    let daySelector = await $$(IOSDatePicker.elementTypePicker)[0];
    // await daySelector.setValue(day);
    const currentDay = await $(
      locatorHelper.generateSelector(
        '**/XCUIElementTypePickerWheel[`value == "13"`]',
        "class_chain"
      )
    );

    const expectedDay = await locatorHelper.generateSelector(
      `**/XCUIElementTypePickerWheel['value == "${day}"']`,
      "class_chain"
    );

    while(!await $(expectedDay).isDisplayed()){
        await driver.swipe({
            scrollableElement: daySelector,
            direction: 'down',
            percent: 0.7
        })
        daySelector = await $$(IOSDatePicker.elementTypePicker)[0]
    }
    
    await $(expectedDay).setValue(day)
  }

  static async submitDate() {
    await $(IOSDatePicker.confirmBtn).click();
  }

  static async closePicker() {
    await $(IOSDatePicker.cancelBtn).click();
  }
}
