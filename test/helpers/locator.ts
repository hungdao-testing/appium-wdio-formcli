import { driver } from "@wdio/globals";

function getIOSSelector(selector: string) {
  if (selector.startsWith("UIATarget")) {
    return `ios=${selector}`;
  }

  if (selector.includes("XCUIElementType") && selector.includes("type ==")) {
    return `-ios predicate string:${selector}`;
  }

  if (selector.includes("XCUIElementType")) {
    return `-ios class chain:${selector}`;
  }

  return `~${selector}`;
}

function getAndroidSelector(selector: string) {
  if (selector.startsWith("new UiSelector()")) {
    return `android=${selector}`;
  }
  if (selector.startsWith("id")) {
    return selector;
  }else{

    return `~${selector}`;
  }

}

function generateSelector(selector: string) {
  selector.trim();

  return driver.isAndroid
    ? getAndroidSelector(selector)
    : getIOSSelector(selector);
}



export const locatorHelper = {
    generateSelector
}