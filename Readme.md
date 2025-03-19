## Automation React-native app by Appium/Wdio

### Source app
- The android and ios app are built from the repo `https://github.com/hungdao-testing/rn-forms/releases/tag/v1.0.0`

### Technology:
- Testing framework: Appium + Wdio
- Test script desgin technique: Page Object Model

### App walk-through

The mobile app simulates the check-out process by inputing 2 forms
- Personal information
- Payment information

User have to input all required information in each screen, then could navigate to the next one. The final screen is `Summary`. Here is e2e flow

Home -> click [Checkout] -> Personal tab -> Paymen tab -> Summary -> Home

#### 1. Personal information notes:
In this screen, there are few notes MUST be taken into account:

- Country dropdown in `iOS`: to open it, user HAVE TO click near the end of the dropdown
- Date-picker modal is different between `android` and `ios`, and the selected value displaying in the `date` field has different format.

- All fields in this screen are required.

#### 2. Payment information notes:
- The `Save card` check-box is different between `android` and `ios`, this field is optional

#### 3. Summary information:
- User could edit for each card (personal or payment), and then the corresponding flow is triggered again.

#### Error message and more format for fields:

Please refer to the https://github.com/hungdao-testing/rn-forms/blob/v1.0.0/src/contexts/CheckoutFormProvider.tsx

Here is the source code
```ts
export const PersonalInfoSchema = z.object({
  fullName: z
    .string({
      message: 'Full name must be required',
    })
    .min(1, {message: 'Full name must be longer than 1'}),
  address: z.string().min(1, {message: 'Please provide address'}),
  city: z.string().min(1, {message: 'City is required'}),
  postCode: z.string().min(1, {message: 'PostalCode is required'}),
  country: z.string().length(2),
  phoneNumber: z.string().min(1, {message: 'Please provide phone number'}),
  dateOfBirth: z.string(),
});

export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;

export const PaymentInfoSchema = z.object({
  cardNumber: z
    .string({message: 'Please provide card number'})
    .min(1, {message: 'Card number must be longer than 1'}),
  expireDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Please use MM/YY format'),
  cvv: z.coerce
    .number({message: 'Please provide cvv number'})
    .min(100, {message: 'input should be greater than 100'})
    .max(999, {message: 'input should be less than 999'}),
  saveCard: z.boolean().optional(),
});
```
