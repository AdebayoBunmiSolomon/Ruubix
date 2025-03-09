import { type ParamListBase } from "@react-navigation/native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type BottomTabScreenProps } from "@react-navigation/bottom-tabs";

//auth screen stack navigation
export interface AuthStackParamList extends ParamListBase {
  Onboarding: undefined;
  Login: undefined;
  PhoneNumber: undefined;
  VerifyPhoneNumber: {
    phone_number: string;
  };
  CreatePassword: undefined;
  CreatePasswordSuccess: undefined;
  SignUpPhoneNumber: undefined;
  SignUpCreatePassword: undefined;
  SignUpVerifyPhoneNumber: undefined;
  CreateAccount: undefined;
  CreateAccountSuccess: undefined;
  SetUpPin: undefined;
}

export type AuthScreenProps<ScreenName extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, ScreenName>;

//bottom tab-bar screen navigation
export interface BottomTabBarStackParamList extends ParamListBase {}

export type BottomTabBarScreenProps<
  ScreenName extends keyof BottomTabBarStackParamList
> = BottomTabScreenProps<BottomTabBarStackParamList, ScreenName>;

//native and app screen navigation
export interface RootStackParamList extends ParamListBase {
  Home: undefined;
}

export type RootStackScreenProps<ScreenName extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, ScreenName>;
