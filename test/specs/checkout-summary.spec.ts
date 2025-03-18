import { expect } from "@wdio/globals";
import * as COUNTRIES from "../data/countries.json";
import { checkoutFlow } from "../flows/checkout-flow";
import { PaymentInfo, PersonalInfo } from "../type";
import SummaryTab from "../pageobjects/summary.tab";
import PersonalTab from "../pageobjects/personal.tab";
import PaymentTab from "../pageobjects/payment.tab";

describe("Checkout - Summary @personal-summary", () => {
  const now = new Date(Date.now());
  const personalInfo: PersonalInfo = {
    fullName: "David James",
    address: "2 Ap Bac, TB district",
    city: "Saigon",
    postCode: "70001",
    phoneNumber: "0792715261",
    dateOfBirth: {
      day: now.getDate(),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    },
    country: { name: COUNTRIES[0].name, code: COUNTRIES[0].code },
  };
  const paymentInfo: PaymentInfo = {
    cardNumber: "1890987223243",
    expireDate: "12/35",
    cvv: "345",
    saveCard: true,
  };

  let summaryTab = new SummaryTab(personalInfo, paymentInfo);

  it("User could edit personal and payment info", async () => {
    //arrange
    const personalTab = new PersonalTab();
    const paymentTab = new PaymentTab();
    const updatedFullName = "Josh Will";
    const updatedCardNumber = "9990987223000";

    await checkoutFlow(personalInfo, paymentInfo);
    expect(await summaryTab.isAt()).toBeTruthy();

    //act
   
    await summaryTab.editOnCard("personal");
    await personalTab.setFullName(updatedFullName);
    await personalTab.submit();
    await paymentTab.submit();

    await summaryTab.editOnCard("payment");
    await paymentTab.setCardNumber(updatedCardNumber);
    await personalTab.submit();

  

    //assert
    summaryTab = new SummaryTab(
      { ...personalInfo, fullName: updatedFullName },
      { ...paymentInfo, cardNumber: updatedCardNumber }
    );
    expect(await summaryTab.isAt()).toBeTruthy();
  });
});
