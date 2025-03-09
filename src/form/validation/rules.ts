import * as yup from "yup";

export const loginFormValidationSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  password: yup.string().required("password is required"),
});

export const phoneNumberFormValidationSchema = yup.object().shape({
  phone_number: yup.string().required("phone number is required"),
});

export const createPasswordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "passwords must match") // Confirms that the password matches
    .required("confirm password is required"),
});

export const signUpPhoneNumberFormValidationSchema = yup.object().shape({
  country: yup.string().required("country is required"),
  phone_number: yup.string().required("phone number is required"),
});

export const SignUpCreatePasswordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "passwords must match") // Confirms that the password matches
    .required("confirm password is required"),
});

export const createAccountStep1ValidationSchema = yup.object().shape({
  first_name: yup.string().required("first name is required"),
  last_name: yup.string().required("last name is required"),
  email_address: yup
    .string()
    .email("invalid email address")
    .required("email is required"),
  phone_number: yup.string().required("phone number is required"),
  gender: yup.string().required("gender is required"),
  date: yup.string().required("date is required"),
  month: yup.string().required("month is required"),
  year: yup.string().required("year is required"),
});

export const createAccountStep2ValidationSchema = yup.object().shape({
  country_of_residence: yup
    .string()
    .required("country of residence is required"),
  state_or_province: yup.string().required("state/province is required"),
  city: yup.string().required("city is required"),
  residential_address: yup.string().required("residential address is required"),
  postal_or_zip_code: yup.string().required("postal/zip code is required"),
});

export const createAccountStep3ValidationSchema = yup.object().shape({
  proof_of_identity: yup.string().required("proof of identity is required"),
  proof_of_address: yup.string().required("proof of address is required"),
  face_verification: yup.string().required("face verification is required"),
});
