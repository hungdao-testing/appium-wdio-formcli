import HomePage from "../pageobjects/home.page";
import PaymentTab from "../pageobjects/payment.tab";
import PersonalTab from "../pageobjects/personal.tab";
import { PaymentInfo, PersonalInfo } from "../type";

export async function checkoutFlow(personalInfo: PersonalInfo, paymentInfo: PaymentInfo){
    const home = new HomePage();
    const personalTab = new PersonalTab();
    const paymentTab = new PaymentTab();
    await home.openCheckOut();

    await personalTab.setFullName(personalInfo.fullName);
    await personalTab.setAddress(personalInfo.address);
    await personalTab.setCity(personalInfo.city);
    await personalTab.setPostCode(personalInfo.postCode);
    await personalTab.setPhone(personalInfo.phoneNumber);
    await personalTab.setCountry(personalInfo.country.name);
    await personalTab.setDob(
      personalInfo.dateOfBirth.day,
      personalInfo.dateOfBirth.month,
      personalInfo.dateOfBirth.year
    );
    await personalTab.submit()

    await paymentTab.setCardNumber(paymentInfo.cardNumber);
    await paymentTab.setExpiredDate(paymentInfo.expireDate);
    await paymentTab.setCvv(paymentInfo.cvv)
    await paymentTab.setCreditCardBox(paymentInfo.saveCard ?? false);
    await paymentTab.submit()
}