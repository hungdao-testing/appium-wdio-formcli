import { driver } from "@wdio/globals";
import { locatorHelper } from "../helpers/locator";

export default class Page {
  public get platform() {
    return driver.isAndroid ? "android" : "ios";
  }


  protected generateSelector(selector: string) {
    selector.trim();
    return locatorHelper.generateSelector(selector);
  }
}
