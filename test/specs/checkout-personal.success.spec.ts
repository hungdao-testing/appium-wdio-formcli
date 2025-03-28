import { expect} from "@wdio/globals";
import HomePage from "../pageobjects/home.page";
import PersonalTab from "../pageobjects/personal.tab";
import allureReporter from '@wdio/allure-reporter'

describe("Checkout - Personal info @personal-info", () => {
  allureReporter.addFeature('Checkout')
  allureReporter.addSuite('personal-info')

  const home = new HomePage();
  const personalTab = new PersonalTab();
  const now = new Date(Date.now());

  async function expectedForDob(date: {
    day: number;
    month: number;
    year: number;
  }) {
    if (personalTab.platform === "ios") {
      expect(await personalTab.getDob()).toBe(
        `${date.day}/${date.month}/${date.year}`
      );
    } else {
      expect(await personalTab.getDob()).toBe(
        `${date.month}/${date.day}/${date.year}`
      );
    }
  }

  it("User could input personal info @smoke", async () => {
    allureReporter.addStory('input required fields personal-info')
    const countryData = {
      name: "American Samoa",
      code: "AS",
    };
    const dob = {
      day: now.getDate() + 1 > 28 ? now.getDate() -1 : 28 ,
      month: now.getMonth() + 2 > 11 ? 11 : now.getMonth() + 2,
      year: now.getFullYear() - 5,
    };
    expect(await home.isAt()).toBeTruthy();
    await home.openCheckOut();

    await personalTab.setFullName("David James");
    await personalTab.setAddress("2 Ap Bac, TB district");
    await personalTab.setCity("Saigon");
    await personalTab.setPostCode("70001");
    await personalTab.setPhone("0792765378");
    await personalTab.setCountry(countryData.name);
    await personalTab.setDob(dob.day, dob.month, dob.year);

    expect(await personalTab.getFullName()).toBe("David James");
    expect(await personalTab.getAddress()).toBe("2 Ap Bac, TB district");
    expect(await personalTab.getCity()).toBe("Saigon");
    expect(await personalTab.getPostCode()).toBe("70001");
    expect(await personalTab.getPhone()).toBe("0792765378");
    expect([countryData.code, countryData.name]).toContain(
      await personalTab.getCountry()
    );
    await expectedForDob({ day: dob.day, month: dob.month, year: dob.year });
    
  });
});
