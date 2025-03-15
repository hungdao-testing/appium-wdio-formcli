import { locatorHelper } from "../helpers/locator";
import { $$, $, driver } from "@wdio/globals";
import { swipeAction } from "../mobileAction/swipe";
import { MOBILE_UI_CONSTANTS } from "../constants/mobileUI";

export default class AndroidDropdown {
  private static dropdownDialog = locatorHelper.generateSelector(
    'new UiSelector().resourceId("com.formscli:id/select_dialog_listview")'
  );
  private static dropdownOptions = locatorHelper.generateSelector(
    "id=android:id/text1"
  );

  private static option = locatorHelper.generateSelector(
    'new UiSelector().text("option")'
  );

  /**
   * @description
   *
   * Scroll dropdown (up|down) from visible `fromText` to the expected one `targetText`
   *
   * First: need to set direction of scrolling `up or down` by comparing charCode
   *
   * Second: need to grab bouding rect of the dropdown dialog to set the scrolling points (x, y)
   *
   * @param fromText
   * @param targetText
   */
  static async scrollToSelect(fromText: string, targetText: string) {
    type directionT = "down" | "up";

    const charCodeOfFromText = fromText.charCodeAt(0);
    const charCodeOfTargetText = targetText.charCodeAt(0);
    let direction = swipeAction.setVerticalDirectionBy(
      charCodeOfFromText,
      charCodeOfTargetText
    ) as directionT;

    const expectedToSeeElement = AndroidDropdown.option.replace(
      "option",
      targetText
    );

    await swipeAction.swipeVerticallyByCoordUntilSeeElement(
      AndroidDropdown.dropdownDialog,
      expectedToSeeElement,

      {
        direction,
        percent: MOBILE_UI_CONSTANTS.android.SWIPE_PERCENT,
        duration: 500
      }
    );
    await $(expectedToSeeElement).click();
  }
}
