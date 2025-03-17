export interface PersonalInfo{
    fullName: string,
    address: string,
    city: string,
    postCode: string,
    country: string,
    phoneNumber: string,
    dateOfBirth: string,
}

export interface PaymentInfo{
    cardNumber: string,
    expireDate: string,
    cvv: string,
    saveCard?: boolean
}