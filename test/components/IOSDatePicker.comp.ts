import { $$, driver, $ } from "@wdio/globals";
import { locatorHelper } from "../helpers/locator";
import { dateHelper } from "../helpers/date";
import { swipeAction } from "../mobileAction/swipe";
import { MOBILE_UI_CONSTANTS } from "../constants/mobileUI";

async function comparingValueToScroll(
  pickerElement: ChainablePromiseElement,
  expectedElement: {
    locator: string;
  },
  direction: "up" | "down",
  cb: () => Promise<{ percent: number; duration: number }>
) {
  let isContinueScroll = true;
  while (isContinueScroll) {
    if (await $(expectedElement.locator).isDisplayed()) {
      await $(expectedElement.locator).click();
      break;
    }

    let percentToScroll = await cb();

    await driver.swipe({
      scrollableElement: pickerElement,
      direction: direction,
      ...percentToScroll,
    });
  }
}
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

    const percentToScroll = async () => {
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
      return percentToScroll;
    };
    await comparingValueToScroll(
      monthSelector,
      { locator: expectedMonth },
      direction!,
      percentToScroll
    );
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
    const percentToScroll = async () => {
      let currentSelectedVal = await yearSelector.getAttribute("value");
      let percentToScroll =
        Math.abs(parseInt(currentSelectedVal) - year) > 5
          ? { percent: 0.7, duration: 500 }
          : {
              percent: MOBILE_UI_CONSTANTS.ios.SMALL_SWIPE_DATE_PICKER,
              duration: 500,
            };
      return percentToScroll;
    };
    await comparingValueToScroll(
      yearSelector,
      { locator: expectedYear },
      direction!,
      percentToScroll
    );
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

    const percentToScroll = async () => {
      let currentSelectedVal = await daySelector.getAttribute("value");
      let percentToScroll =
        Math.abs(parseInt(currentSelectedVal) - day) > 7
          ? { percent: 0.7, duration: 500 }
          : {
              percent: MOBILE_UI_CONSTANTS.ios.SMALL_SWIPE_DATE_PICKER,
              duration: 500,
            };
      return percentToScroll;
    };
    await comparingValueToScroll(
      daySelector,
      { locator: expectedDay },
      direction!,
      percentToScroll
    );
  }

  static async submitDate() {
    await $(IOSDatePicker.confirmBtn).click();
  }

  static async closePicker() {
    await $(IOSDatePicker.cancelBtn).click();
  }
}
