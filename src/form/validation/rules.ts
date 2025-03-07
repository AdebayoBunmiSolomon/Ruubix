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
