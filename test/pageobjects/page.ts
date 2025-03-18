import { driver, $ } from "@wdio/globals";

export default class Page {
  public get platform() {
    return driver.isAndroid ? "android" : "ios";
  }

  protected async setValueToInputField(locator: string, value: string) {
    await $(locator).setValue(value);
  }

  protected async getContentOfInputField(selector: string) {
    if (this.platform === "android") {
      return $(selector).getAttribute("text");
    } else {
      const value = await $(selector).getAttribute("value");
      const label = await $(selector).getAttribute("label");
      return value || label;
    }
  }

  protected expectedForDob(date: { day: number; month: number; year: number }) {
    if (this.platform === "ios") {
      return `${date.day}/${date.month}/${date.year}`;
    } else {
      return `${date.month}/${date.day}/${date.year}`;
    }
  }
}
