import { driver } from "@wdio/globals";

// function getIOSSelector(selector: string) {
//   if (selector.startsWith("UIATarget")) {
//     return `ios=${selector}`;
//   }

//   if (selector.includes("predicate:")) {
//     return `-ios predicate string:${selector}`;
//   }

//   if (selector.includes("**/XCUIElementType")) {
//     return `-ios class chain:${selector}`;
//   }

//   return `~${selector}`;
// }

type iOSMethod =
  | "UiAutomation"
  | "accessibility_id"
  | "predicate_string"
  | "class_chain"
  | "xpath"
  | "class_name";

function getIOSSelector(selector: string, iOSMethod: iOSMethod) {
  if (iOSMethod === "UiAutomation") {
    return `ios=${selector}`;
  }

  if (iOSMethod === "predicate_string") {
    return `-ios predicate string:${selector}`;
  }

  if (iOSMethod === "class_chain") {
    return `-ios class chain:${selector}`;
  }

  if (iOSMethod === "xpath") {
    return `${selector}`;
  }

  if (iOSMethod === "accessibility_id") {
    return `~${selector}`;
  }

  return `${selector}`;
}

function getAndroidSelector(selector: string) {
  if (selector.startsWith("new UiSelector()")) {
    return `android=${selector}`;
  }
  if (selector.startsWith("id")) {
    return selector;
  }
  if (selector.startsWith("//")) {
    return selector;
  }
  return `~${selector}`;
}

function generateSelector(
  selector: string,
  iOSSearchMethod: iOSMethod = "accessibility_id"
) {
  selector.trim();

  return driver.isAndroid
    ? getAndroidSelector(selector)
    : getIOSSelector(selector, iOSSearchMethod);
}

export const locatorHelper = {
  generateSelector,
};
