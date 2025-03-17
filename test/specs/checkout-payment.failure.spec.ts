import { expect } from "@wdio/globals";
import HomePage from "../pageobjects/home.page";
import PersonalTab from "../pageobjects/personal.tab";
import * as COUNTRIES from "../data/countries.json";
import PaymentTab from "../pageobjects/payment.tab";

describe("Checkout - Personal info @personal-info", () => {
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

  beforeEach(async () => {
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
    await personalTab.submit();
  });
  it("Verify error messages for fields @regression", async () => {
    //arrange

    const paymentInfo = {
      cardNumber: "",
      expiredDate: "",
      cvv: "",
      saveCreditCard: true,
    };

    expect(await paymentTab.isAt()).toBeTruthy();

    //act
    await paymentTab.setCardNumber(paymentInfo.cardNumber);
    await paymentTab.setExpiredDate(paymentInfo.expiredDate);
    await paymentTab.setCvv(paymentInfo.cvv);
    await paymentTab.setCreditCardBox(paymentInfo.saveCreditCard);
    await paymentTab.submit();

    //assert
    expect(await paymentTab.getErrorMessageOnField("cardNumber")).toBe(
      "Please provide card number"
    );
    expect(await paymentTab.getErrorMessageOnField("expiredDate")).toBe(
      "Required"
    );
    expect(await paymentTab.getErrorMessageOnField("cvv")).toBe(
      "Please provide cvv number"
    );

    //arrange
    const paymentInfoOne = {
      cardNumber: "198002983434",
      expiredDate: "36/01",
      cvv: "3456",
      saveCreditCard: true,
    };

    //act
    await paymentTab.setCardNumber(paymentInfoOne.cardNumber);
    await paymentTab.setExpiredDate(paymentInfoOne.expiredDate);
    await paymentTab.setCvv(paymentInfoOne.cvv);
    await paymentTab.setCreditCardBox(paymentInfoOne.saveCreditCard);
    await paymentTab.submit();

    //assert
    expect(await paymentTab.getErrorMessageOnField("expiredDate")).toBe(
      "Please use MM/YY format"
    );
    expect(await paymentTab.getErrorMessageOnField("cvv")).toBe(
      "input should be less than 999"
    );

    //arrange
    const paymentInfoTwo = {
      cardNumber: "9081981088934343",
      expiredDate: "12/12",
      cvv: "99",
      saveCreditCard: false,
    };

    //act
    await paymentTab.setCardNumber(paymentInfoTwo.cardNumber);
    await paymentTab.setExpiredDate(paymentInfoTwo.expiredDate);
    await paymentTab.setCvv(paymentInfoTwo.cvv);
    await paymentTab.setCreditCardBox(paymentInfoTwo.saveCreditCard);
    await paymentTab.submit();

    //assert
    expect(await paymentTab.getErrorMessageOnField("cvv")).toBe(
      "input should be greater than 100"
    );
  });
});
