import { authScreenTypes } from "@src/types/types";
import { authScreenNames } from "./navigation-names";
import { Login, Onboarding, SignUp } from "@src/screens/auth";
import {
  CreatePassword,
  CreatePasswordSuccess,
  PhoneNumber,
  VerifyPhoneNumber,
} from "@src/screens/auth/forgot-password";

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
    screenName: authScreenNames.SIGN_UP,
    component: SignUp,
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
];
