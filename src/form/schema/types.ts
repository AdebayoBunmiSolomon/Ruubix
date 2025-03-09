export type loginFormTypes = {
  username: string;
  password: string;
};

export type phoneNumberFormTypes = {
  phone_number: string;
};

export type createPasswordFormTypes = {
  password: string;
  confirm_password: string;
};

export type signUpPhoneNumberFormTypes = {
  country: string;
  phone_number: string;
};

export type SignUpCreatePasswordFormTypes = {
  password: string;
  confirm_password: string;
};

export type createAccountStep1FormTypes = {
  first_name: string;
  last_name: string;
  email_address: string;
  phone_number: string;
  gender: string;
  date: string;
  month: string;
  year: string;
};

export type createAccountStep2FormTypes = {
  country_of_residence: string;
  state_or_province: string;
  city: string;
  residential_address: string;
  postal_or_zip_code: string;
};

export type createAccountStep3FormTypes = {
  proof_of_identity: string;
  proof_of_address: string;
  face_verification: string;
};
