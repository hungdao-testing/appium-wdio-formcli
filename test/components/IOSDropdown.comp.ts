import { locatorHelper } from "../helpers/locator";
import { $ } from "@wdio/globals";
import { swipeAction } from "../mobileAction/swipe";
import { MOBILE_UI_CONSTANTS } from "../constants/mobileUI";

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

    const charCodeOfFromText = fromText.charCodeAt(0);
    const charCodeOfTargetText = targetText.charCodeAt(0);
    let direction = swipeAction.setVerticalDirectionBy(
      charCodeOfFromText,
      charCodeOfTargetText
    ) as directionT;

    let expectedToSeeElement = IOSDropdown.option.replace("option", targetText);

    const scrollableEl = $(IOSDropdown.dialog);
    await swipeAction.swipeUntilCondition($(expectedToSeeElement).isDisplayed, {
      direction,
      scrollableElement: scrollableEl,
      percent: MOBILE_UI_CONSTANTS.ios.SWIPE_PERCENT,
    });


    await $(this.outsideDialog).click();
  }
}
