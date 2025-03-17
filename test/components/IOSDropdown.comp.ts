import { locatorHelper } from "../helpers/locator";
import { $, driver } from "@wdio/globals";
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
export default class IOSDropdown {
  private static option = locatorHelper.generateSelector(
    'value == "option"',
    "predicate_string"
  );

  private static dialog = locatorHelper.generateSelector(
    "**/XCUIElementTypeWindow/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[4]",
    "class_chain"
  );

  private static outsideDialog = locatorHelper.generateSelector(
    "ios_modal_top",
    "accessibility_id"
  );

  public static async waitUntilDropdownLoadedWithText() {
    await $(IOSDropdown.dialog).waitForDisplayed();
  }

  static async scrollToSelect(fromText: string, targetText: string) {
    type directionT = "down" | "up";

    let direction: directionT;
    const sortedArr = [fromText, targetText].sort();
    if (sortedArr[0] === fromText) {
      direction = "up";
    } else {
      direction = "down";
    }

    let expectedToSeeElement = IOSDropdown.option.replace("option", targetText);
    const scrollableEl = $(IOSDropdown.dialog);

    const percentToScroll = async () => {
      let currentSelectedVal =
        (await $(
          locatorHelper.generateSelector(
            "XCUIElementTypePickerWheel",
            "class_name"
          )
        ).getAttribute("value")) === "Select a country"
          ? "AZZ"
          : await $(
              locatorHelper.generateSelector(
                "XCUIElementTypePickerWheel",
                "class_name"
              )
            ).getAttribute("value");
      let totalCharCodeOfCurrentSelectedVal = Array.from(
        currentSelectedVal.slice(0, 3)
      ).reduce((prev, curr) => prev + curr.charCodeAt(0), 0);
      let totalCharCodeOfTargetText = Array.from(targetText.slice(0, 3)).reduce(
        (prev, curr) => prev + curr.charCodeAt(0),
        0
      );
      let percentToScroll =
        Math.abs(
          totalCharCodeOfCurrentSelectedVal - totalCharCodeOfTargetText
        ) >= 30
          ? { percent: 0.7, duration: 500 }
          : {
              percent: MOBILE_UI_CONSTANTS.ios.SMALL_SWIPE_DATE_PICKER,
              duration: 1000,
            };
      return percentToScroll;
    };
    await comparingValueToScroll(
      scrollableEl,
      { locator: expectedToSeeElement },
      direction!,
      percentToScroll
    );

    await $(this.outsideDialog).click();
  }
}
