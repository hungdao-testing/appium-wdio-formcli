import { expect } from "@wdio/globals";
import HomePage from "../pageobjects/home.page";
import PersonalTab from "../pageobjects/personal.tab";

describe("Checkout - Personal info @personal-info", () => {
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
    const countryData = {
      name: "American Samoa",
      code: "AS",
    };
    const dob = {
      day: 1,
      month: 12,
      year: now.getFullYear() - 7,
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
