import { driver, $ } from "@wdio/globals";

export default class Page {
  public get platform() {
    return driver.isAndroid ? "android" : "ios";
  }

  protected async setValueToInputField(locator: string, value: string) {
    await $(locator).setValue(value);
  }

  protected async getContentOfInputField(selector: string) {
    if(this.platform === 'android'){
      return $(selector).getAttribute("text");
    }else{
      const value = await $(selector).getAttribute("value");
      const label = await $(selector).getAttribute("label");
      return value || label;
    }
   
  }
}
