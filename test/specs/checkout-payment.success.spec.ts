import { expect } from "@wdio/globals";
import HomePage from "../pageobjects/home.page";
import PersonalTab from "../pageobjects/personal.tab";
import * as COUNTRIES from "../data/countries.json";
import PaymentTab from "../pageobjects/payment.tab";
import allureReporter from '@wdio/allure-reporter'


describe("Checkout - Payment info @payment-info", () => {
  const home = new HomePage();
  const personalTab = new PersonalTab();
  const paymentTab = new PaymentTab();
  const now = new Date(Date.now());

  const personalInfo = {
    fullName: "David James",
    address: "2 Ap Bac, TB district",
    city: "Saigon",
    postCode: "70001",
    phone: "0792715261",
    dob: {
      day: now.getDate(),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    },
    country: COUNTRIES[0].name,
  };
  it("User could input payment info @smoke", async () => {
    allureReporter.addStory('input required fields payment-info')
    //arrange
    expect(await home.isAt()).toBeTruthy();
    await home.openCheckOut();

    await personalTab.setFullName(personalInfo.fullName);
    await personalTab.setAddress(personalInfo.address);
    await personalTab.setCity(personalInfo.city);
    await personalTab.setPostCode(personalInfo.postCode);
    await personalTab.setPhone(personalInfo.phone);
    await personalTab.setCountry(personalInfo.country);
    await personalTab.setDob(
      personalInfo.dob.day,
      personalInfo.dob.month,
      personalInfo.dob.year
    );
    await personalTab.submit()

    //act
    const paymentInfo = {
        cardNumber: '1890987223243',
        expiredDate: '12/35',
        cvv: '345',
        saveCreditCard: true
    }

    expect(await paymentTab.isAt()).toBeTruthy();

    await paymentTab.setCardNumber(paymentInfo.cardNumber);
    await paymentTab.setExpiredDate(paymentInfo.expiredDate);
    await paymentTab.setCvv(paymentInfo.cvv)
    await paymentTab.setCreditCardBox(paymentInfo.saveCreditCard);

    expect(await paymentTab.getCardNumber()).toBe(paymentInfo.cardNumber);
    expect(await paymentTab.getExpiredDate()).toBe(paymentInfo.expiredDate);
    expect(await paymentTab.getCvv()).toBe(paymentInfo.cvv);
    expect(await paymentTab.getCreditCardBox()).toBe(paymentInfo.saveCreditCard);


  });
});
