export interface PersonalInfo {
  fullName: string;
  address: string;
  city: string;
  postCode: string;
  country: {
    name: string;
    code: string;
  };
  phoneNumber: string;
  dateOfBirth: {
    day: number;
    month: number;
    year: number;
  };
}

export interface PaymentInfo {
  cardNumber: string;
  expireDate: string;
  cvv: string;
  saveCard?: boolean;
}
