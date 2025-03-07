import React, { useEffect, useState } from "react";
import { Screen } from "../Screen";
import { AuthScreenProps } from "@src/router/types";
import { authScreenNames } from "@src/navigation";
import { AppHeader } from "@src/common";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  Image,
  Alert,
} from "react-native";
import { DVH, DVW, moderateScale } from "@src/resources/scaling";
import { Controller, useForm } from "react-hook-form";
import { loginFormTypes } from "@src/form/schema/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormValidationSchema } from "@src/form/validation/rules";
import { CustomInput, CustomText, CustomButton } from "@src/components/shared";
import { ScrollContainer } from "../Scroll-Container";
import { colors } from "@src/resources/colors/colors";
import { Fingerprint } from "lucide-react-native";
import { BiometricLogin } from "@src/components/auth/login";
import { useLocalAuthentication } from "@src/hooks/services/useLocalAuthentication";

export const Login = ({
  navigation,
}: AuthScreenProps<authScreenNames.LOGIN>) => {
  const [biometricVisible, setBiometricVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    isBiometricSupported,
    handleBiometricAuth,
    isBiometricAuthenticated,
  } = useLocalAuthentication();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormTypes>({
    mode: "onChange",
    resolver: yupResolver(loginFormValidationSchema),
  });

  const onSubmit = (data: loginFormTypes) => {
    if (data) {
      setLoading(true);
      setTimeout(() => {
        navigation.navigate(authScreenNames.SIGN_UP);
      }, 3000);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isBiometricSupported) {
      setTimeout(() => {
        setBiometricVisible(!biometricVisible);
      }, 700);
    }
  }, [isBiometricSupported]);

  //navigate user to the next screen
  useEffect(() => {
    const verifyBiometricLoginAsync = async () => {
      if (biometricVisible) {
        const { success } = await handleBiometricAuth();
        if (success) {
          navigation.navigate(authScreenNames.SIGN_UP);
        }
      }
    };

    verifyBiometricLoginAsync();
  }, [biometricVisible]);

  return (
    <>
      <Screen style={styles.screen}>
        <AppHeader
          title='Log In'
          onPressArrowBack={() => navigation.goBack()}
        />
        <View
          style={{
            flex: 1,
          }}>
          <ScrollContainer style={styles.scrollContainer}>
            <Controller
              control={control}
              render={({ field }) => (
                <CustomInput
                  title='Username'
                  titleType='nunito-bold'
                  titleColor={colors.black}
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                  placeholder='Eg. email@something.com'
                  type='custom'
                  showErrorText
                  error={errors?.username?.message}
                  style={styles.input}
                />
              )}
              name='username'
              defaultValue=''
            />

            <Controller
              control={control}
              render={({ field }) => (
                <CustomInput
                  title='Password'
                  titleType='nunito-bold'
                  titleColor={colors.black}
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                  placeholder=''
                  type='password'
                  showErrorText
                  error={errors?.password?.message}
                  style={styles.input}
                />
              )}
              name='password'
              defaultValue=''
            />
            <TouchableOpacity
              style={styles.forgotPasswordBtn}
              onPress={() => navigation.navigate(authScreenNames.PHONE_NUMBER)}>
              <CustomText
                type='mulish-extrabold'
                size={12}
                orange
                style={styles.forgotPasswordText}>
                Forgot password
              </CustomText>
            </TouchableOpacity>
            <View>
              <CustomButton
                title='Login'
                textType='nunito-semibold'
                textSize={16}
                onPress={handleSubmit(onSubmit)}
                buttonType='Solid'
                bgBlack
                textWhite
                style={{
                  paddingVertical: moderateScale(15),
                  width: "100%",
                  marginVertical: moderateScale(5),
                }}
                isLoading={loading}
                loaderColor={colors.white}
              />
              <View style={styles.signUpContainer}>
                <CustomText type='nunito-regular' size={16} black>
                  Don't have an account?
                </CustomText>
                <TouchableOpacity
                  style={{
                    paddingVertical: moderateScale(5),
                  }}>
                  <CustomText type='nunito-bold' size={16} orange>
                    Sign Up
                  </CustomText>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.fingerPrintBtn}
                onPress={() => {
                  if (isBiometricSupported) {
                    setBiometricVisible(!biometricVisible);
                  } else {
                    Alert.alert(
                      "Error",
                      "No Biometric supported for this device"
                    );
                  }
                }}>
                <Fingerprint
                  color={colors.black}
                  size={moderateScale(40)}
                  height={DVH(10)}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.actionBtnContainer}>
              <CustomButton
                title='Signup with Google'
                textType='nunito-semibold'
                textSize={16}
                onPress={() => {}}
                buttonType='Outline'
                bgBlack
                textBlack
                style={styles.actionBtn}
                leftIcon={
                  <Image
                    source={require("@src/assets/png/google.png")}
                    style={{
                      width: DVW(6),
                      height: DVH(3),
                    }}
                    resizeMode='contain'
                  />
                }
              />
              <CustomButton
                title='Signup with Apple'
                textType='nunito-semibold'
                textSize={16}
                onPress={() => navigation.navigate(authScreenNames.LOGIN)}
                buttonType='Outline'
                bgBlack
                textBlack
                style={styles.actionBtn}
                leftIcon={
                  <Image
                    source={require("@src/assets/png/apple.png")}
                    style={{
                      width: DVW(7),
                      height: DVH(3),
                    }}
                    resizeMode='contain'
                  />
                }
              />
            </View>
          </ScrollContainer>
        </View>
      </Screen>
      <BiometricLogin
        visible={biometricVisible}
        setIsVisible={() => setBiometricVisible(!biometricVisible)}
        biometricAuthenticated={isBiometricAuthenticated}
      />
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: moderateScale(10),
    backgroundColor: colors.white,
  },
  input: {
    backgroundColor: colors.white,
  },
  scrollContainer: {
    gap: moderateScale(20),
  },
  forgotPasswordBtn: {
    alignItems: "flex-end",
    paddingVertical: moderateScale(5),
    marginTop: moderateScale(-10),
  },
  forgotPasswordText: {
    textDecorationLine: "underline",
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: moderateScale(7),
    gap: moderateScale(3),
  },
  fingerPrintBtn: {
    alignSelf: "center",
    padding: moderateScale(5),
  },
  actionBtnContainer: {
    alignItems: "center",
    width: "100%",
    gap: moderateScale(20),
    alignSelf: "flex-end",
  },
  actionBtn: {
    paddingVertical: moderateScale(12),
  },
});
