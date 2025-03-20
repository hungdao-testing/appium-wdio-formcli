import { expect } from "@wdio/globals";
import HomePage from "../pageobjects/home.page";
import PersonalTab from "../pageobjects/personal.tab";
import allureReporter from "@wdio/allure-reporter";

describe("Checkout - Personal info @personal-info", () => {
  allureReporter.addFeature("Checkout");
  allureReporter.addSuite("personal-info");

  const home = new HomePage();
  const personalTab = new PersonalTab();

  it("Verify displayed errors @regression", async () => {
    allureReporter.addStory("Handle error messages");
    
    expect(await home.isAt()).toBeTruthy();
    await home.openCheckOut();

    await personalTab.submit();
    expect(await personalTab.getErrorMessageOnField("fullName")).toBe(
      "Full name must be required"
    );
    expect(await personalTab.getErrorMessageOnField("address")).toBe(
      "Required"
    );
    expect(await personalTab.getErrorMessageOnField("city")).toBe("Required");
    expect(await personalTab.getErrorMessageOnField("country")).toBe(
      "Required"
    );
    expect(await personalTab.getErrorMessageOnField("postCode")).toBe(
      "Required"
    );
    expect(await personalTab.getErrorMessageOnField("phoneNumber")).toBe(
      "Required"
    );
    expect(await personalTab.getErrorMessageOnField("dob")).toBe("Required");
  });
});
