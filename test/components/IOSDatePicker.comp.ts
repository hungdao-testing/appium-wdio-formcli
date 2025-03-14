import { $$, driver, $ } from "@wdio/globals";
import { locatorHelper } from "../helpers/locator";
import { dateHelper } from "../helpers/date";
import { swipeAction } from "../mobileAction/swipe";
import { MOBILE_UI_CONSTANTS } from "../constants/mobileUI";

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
    const monthSelector = $$(IOSDatePicker.elementTypePicker)[1];
    const currentMonthValue = await monthSelector.getAttribute("value");

    const direction = swipeAction.setVerticalDirectionBy(
      dateHelper.monthInFullWord.indexOf(currentMonthValue),
      month
    );

    const expectedMonth = locatorHelper.generateSelector(
      `value == "${dateHelper.monthInFullWord[month - 1]}"`,
      "predicate_string"
    );

    // await swipeAction.swipeUntilSeeElement(expectedMonth, {
    //   scrollableElement: monthSelector,
    //   direction: direction,
    //   percent: MOBILE_UI_CONSTANTS.ios.SMALL_SWIPE_DATE_PICKER,
    //   duration: 500,
    // });
    let isContinueScroll = true;
    while (isContinueScroll) {
      if (await $(expectedMonth).isDisplayed()) {
        isContinueScroll = false;
        break;
      }
      let currentSelectedVal = await monthSelector.getAttribute("value");
      let percentToScroll =
        Math.abs(
          dateHelper.monthInFullWord.indexOf(currentSelectedVal) + 1 - month
        ) > 3
          ? { percent: 0.7, duration: 500 }
          : {
              percent: MOBILE_UI_CONSTANTS.ios.SMALL_SWIPE_DATE_PICKER,
              duration: 500,
            };

      await driver.swipe({
        scrollableElement: monthSelector,
        direction: direction,
        ...percentToScroll,
      });
    }
  }

  static async yearPicker(year: number) {
    const yearSelector = $$(IOSDatePicker.elementTypePicker)[2];
    const currentYearValue = await yearSelector.getAttribute("value");
    const direction = swipeAction.setVerticalDirectionBy(
      parseInt(currentYearValue),
      year
    );

    const expectedYear = locatorHelper.generateSelector(
      `value == "${year}"`,
      "predicate_string"
    );
    let isContinueScroll = true;
    while (isContinueScroll) {
      if (await $(expectedYear).isDisplayed()) {
        isContinueScroll = false;
        break;
      }
      let currentSelectedVal = await yearSelector.getAttribute("value");
      let percentToScroll =
        Math.abs(parseInt(currentSelectedVal) - year) > 5
          ? { percent: 0.7, duration: 500 }
          : {
              percent: MOBILE_UI_CONSTANTS.ios.SMALL_SWIPE_DATE_PICKER,
              duration: 500,
            };

      await driver.swipe({
        scrollableElement: yearSelector,
        direction: direction,
        ...percentToScroll,
      });
    }
  }

  static async dayPicker(day: number) {
    const daySelector = await $$(IOSDatePicker.elementTypePicker)[0];
    const currentDayValue = await daySelector.getAttribute("value");
    const direction = swipeAction.setVerticalDirectionBy(
      parseInt(currentDayValue),
      day
    );

    const expectedDay = locatorHelper.generateSelector(
      `value == "${day}"`,
      "predicate_string"
    );
    let isContinueScroll = true;
    while (isContinueScroll) {
      if (await $(expectedDay).isDisplayed()) {
        isContinueScroll = false;
        break;
      }
      let currentSelectedVal = await daySelector.getAttribute("value");
      let percentToScroll =
        Math.abs(parseInt(currentSelectedVal) - day) > 7
          ? { percent: 0.7, duration: 500 }
          : {
              percent: MOBILE_UI_CONSTANTS.ios.SMALL_SWIPE_DATE_PICKER,
              duration: 500,
            };

      await driver.swipe({
        scrollableElement: daySelector,
        direction: direction,
        ...percentToScroll,
      });
    }
  }

  static async submitDate() {
    await $(IOSDatePicker.confirmBtn).click();
  }

  static async closePicker() {
    await $(IOSDatePicker.cancelBtn).click();
  }
}
