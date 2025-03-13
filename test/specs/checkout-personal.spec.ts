import { expect } from "@wdio/globals";
import HomePage from "../pageobjects/home.page";
import PersonalTab from "../pageobjects/personal.tab";

describe.only("Checkout - Personal info", () => {
  const home = new HomePage();
  const personalTab = new PersonalTab();

  it("Input personal info", async () => {
    const countryData = {
      name: "Antarctica",
      code: "AQ",
    };
    const dob = {
      day: 1,
      month: 12,
      year: 2000,
    };
    expect(await home.isAt()).toBeTruthy();
    await home.openCheckOut();



    await personalTab.setFullName('David James');
    await personalTab.setAddress('2 Ap Bac, TB district');
    await personalTab.setCity('Saigon');
    await personalTab.setPostCode('70001');
    await personalTab.setPhone('0792765378');
    await personalTab.setCountry(countryData.name);
    // await personalTab.setDob(dob.month, dob.day, dob.year)

    expect(await personalTab.getFullName()).toBe('David James')
    expect(await personalTab.getAddress()).toBe('2 Ap Bac, TB district');
    expect(await personalTab.getCity()).toBe('Saigon');
    expect(await personalTab.getPostCode()).toBe('70001');
    expect(await personalTab.getPhone()).toBe('0792765378');
    // expect(await personalTab.getDob()).toBe(`${dob.day}/${dob.month}/${dob.year}`)
    // apply for both iOS and android
    expect([countryData.name, countryData.code]).toContain(await personalTab.getCountry())

  });
});
