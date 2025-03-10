import React, { useState } from "react";
import { Screen } from "@src/screens/Screen";
import { AppHeader } from "@src/common";
import { AuthScreenProps } from "@src/router/types";
import { authScreenNames } from "@src/navigation";
import { InfoCard } from "@src/components/auth/sign-up";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { moderateScale } from "@src/resources/scaling";
import { colors } from "@src/resources/colors/colors";
import { Controller, useForm } from "react-hook-form";
import { signUpPhoneNumberFormTypes } from "@src/form/schema/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpPhoneNumberFormValidationSchema } from "@src/form/validation/rules";
import { maskPhoneNumber } from "@src/helper/helper";
import {
  CustomButton,
  CustomInput,
  CustomPhoneInput,
  CustomText,
} from "@src/components/shared";
import { countries } from "@src/constants/countries";
import { ScrollContainer } from "@src/screens/Scroll-Container";

type FormTypes = {
  country: string;
  phoneNumber: string;
};

export const SignUpPhoneNumber = ({
  navigation,
}: AuthScreenProps<authScreenNames.SIGN_UP_PHONE_NUMBER>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [frmValues, setFrmValues] = useState<FormTypes>({
    country: "",
    phoneNumber: "",
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpPhoneNumberFormTypes>({
    mode: "onChange",
    resolver: yupResolver(signUpPhoneNumberFormValidationSchema),
  });

  const onSubmit = async (data: signUpPhoneNumberFormTypes) => {
    if (data) {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      navigation.navigate(authScreenNames.SIGN_UP_CREATE_PASSWORD, {
        phone_number: maskPhoneNumber(data.phone_number),
      });
    }
  };

  return (
    <Screen style={styles.screen}>
      <AppHeader
        title='Get Started'
        onPressArrowBack={() => navigation.goBack()}
        showGetHelp
      />
      <InfoCard text='Warning: Kindly note that your country of choice determines the documents you can use for verification.' />
      {/* <KeyboardDismissal> */}
      <ScrollContainer style={styles.formContainer}>
        <Controller
          control={control}
          render={({ field }) => (
            <CustomInput
              title='Country'
              titleType='nunito-semibold'
              titleColor={colors.black}
              value={field.value}
              placeholder='select option'
              type='dropdown'
              showErrorText
              error={errors?.country?.message}
              style={styles.input}
              dropDownItems={
                countries &&
                countries.map((items) => `${items?.flag} ${items?.name}`)
              }
              onSelectDropDownItem={(text) => {
                field.onChange(text);
                setFrmValues({
                  ...frmValues,
                  country: text,
                });
              }}
            />
          )}
          name='country'
          defaultValue=''
        />
        <Controller
          control={control}
          render={({ field }) => (
            <CustomPhoneInput
              value={field.value}
              titleColor={colors.black}
              title='Enter your phone number'
              titleType='nunito-semibold'
              onChangeText={(value) => {
                field.onChange(value);
                setFrmValues({
                  ...frmValues,
                  phoneNumber: value,
                });
              }}
              placeholder='Enter your phone number'
              style={styles.input}
              showErrorText
              error={errors?.phone_number?.message}
            />
          )}
          name='phone_number'
          defaultValue=''
        />
        <View style={styles.actionBtn}>
          <CustomButton
            title='Continue'
            textType='nunito-semibold'
            textSize={16}
            onPress={handleSubmit(onSubmit)}
            buttonType='Solid'
            textWhite
            style={{
              paddingVertical: moderateScale(15),
              width: "100%",
              backgroundColor:
                frmValues.phoneNumber && frmValues.country
                  ? colors.black
                  : "#B69EB3",
            }}
            loaderColor={colors.white}
            isLoading={loading}
            disabled={frmValues.phoneNumber && frmValues.country ? false : true}
          />
          <View style={styles.signUpContainer}>
            <CustomText type='nunito-regular' size={16} black>
              Have an account?
            </CustomText>
            <TouchableOpacity
              style={{
                paddingVertical: moderateScale(5),
              }}
              onPress={() => navigation.navigate(authScreenNames.LOGIN)}>
              <CustomText type='nunito-bold' size={16} orange>
                Sign In
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollContainer>
      <View style={styles.bottomActionContainer}>
        <CustomText type='nunito-regular' size={13} black>
          By proceeding, I accept the
        </CustomText>
        <TouchableOpacity>
          <CustomText
            type='nunito-bold'
            size={13}
            black
            style={{
              textDecorationLine: "underline",
            }}>
            Terms and Conditions
          </CustomText>
        </TouchableOpacity>
        <CustomText type='nunito-regular' size={13} black>
          and
        </CustomText>
      </View>
      <View
        style={[
          {
            paddingVertical: moderateScale(5),
          },
          styles.bottomActionContainer,
        ]}>
        <TouchableOpacity>
          <CustomText
            type='nunito-bold'
            size={13}
            black
            style={{
              textDecorationLine: "underline",
            }}>
            Privacy Policy
          </CustomText>
        </TouchableOpacity>
        <CustomText type='nunito-regular' size={13} black>
          of Ruubix
        </CustomText>
      </View>
    </Screen>
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
  formContainer: {
    gap: moderateScale(20),
    height: "65%",
  },
  actionBtn: {
    alignSelf: "center",
    alignItems: "center",
    bottom: Platform.OS === "ios" ? moderateScale(0) : moderateScale(5),
    width: "100%",
    gap: moderateScale(7),
    paddingVertical: moderateScale(20),
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: moderateScale(3),
  },
  bottomActionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(4),
    justifyContent: "center",
  },
});
