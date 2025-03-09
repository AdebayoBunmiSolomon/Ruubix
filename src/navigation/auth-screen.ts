import { authScreenTypes } from "@src/types/types";
import { authScreenNames } from "./navigation-names";
import { Login, Onboarding } from "@src/screens/auth";
import {
  CreatePassword,
  CreatePasswordSuccess,
  PhoneNumber,
  VerifyPhoneNumber,
} from "@src/screens/auth/forgot-password";
import {
  CreateAccount,
  CreateAccountSuccess,
  SetUpPin,
  SignUpCreatePassword,
  SignUpPhoneNumber,
  SignUpVerifyPhoneNumber,
} from "@src/screens/auth/sign-up";

export const authScreen: authScreenTypes[] = [
  {
    screenName: authScreenNames.ONBOARDING,
    component: Onboarding,
  },
  {
    screenName: authScreenNames.LOGIN,
    component: Login,
  },
  {
    screenName: authScreenNames.SIGN_UP_PHONE_NUMBER,
    component: SignUpPhoneNumber,
  },
  {
    screenName: authScreenNames.PHONE_NUMBER,
    component: PhoneNumber,
  },
  {
    screenName: authScreenNames.VERIFY_PHONE_NUMBER,
    component: VerifyPhoneNumber,
  },
  {
    screenName: authScreenNames.CREATE_PASSWORD,
    component: CreatePassword,
  },
  {
    screenName: authScreenNames.CREATE_PASSWORD_SUCCESS,
    component: CreatePasswordSuccess,
  },
  {
    screenName: authScreenNames.SIGN_UP_CREATE_PASSWORD,
    component: SignUpCreatePassword,
  },
  {
    screenName: authScreenNames.SIGN_UP_VERIFY_PHONE_NUMBER,
    component: SignUpVerifyPhoneNumber,
  },
  {
    screenName: authScreenNames.CREATE_ACCOUNT,
    component: CreateAccount,
  },
  {
    screenName: authScreenNames.CREATE_ACCOUNT_SUCCESS,
    component: CreateAccountSuccess,
  },
  {
    screenName: authScreenNames.SET_UP_PIN,
    component: SetUpPin,
  },
];
