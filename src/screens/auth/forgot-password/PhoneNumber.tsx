import { AppHeader } from "@src/common";
import { authScreenNames } from "@src/navigation";
import { AuthScreenProps } from "@src/router/types";
import { Screen } from "@src/screens/Screen";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { phoneNumberFormTypes } from "@src/form/schema/types";
import { phoneNumberFormValidationSchema } from "@src/form/validation/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomPhoneInput, CustomButton } from "@src/components/shared";
import { colors } from "@src/resources/colors/colors";
import { StyleSheet, View, Platform } from "react-native";
import { moderateScale } from "@src/resources/scaling";
import { KeyboardDismissal } from "@src/screens/Keyboard-Dismissal";
import { maskPhoneNumber } from "@src/helper/helper";

export const PhoneNumber = ({
  navigation,
}: AuthScreenProps<authScreenNames.PHONE_NUMBER>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<phoneNumberFormTypes>({
    mode: "onChange",
    resolver: yupResolver(phoneNumberFormValidationSchema),
  });

  const onSubmit = async (data: phoneNumberFormTypes) => {
    if (data) {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      navigation.navigate(authScreenNames.VERIFY_PHONE_NUMBER, {
        phone_number: maskPhoneNumber(data.phone_number),
      });
    }
  };

  return (
    <Screen style={styles.screen}>
      <AppHeader
        title='Forgot password'
        onPressArrowBack={() => navigation.goBack()}
        showGetHelp
      />
      <KeyboardDismissal>
        <View>
          <Controller
            control={control}
            render={({ field }) => (
              <CustomPhoneInput
                value={field.value}
                titleColor={colors.black}
                title='Enter your phone number'
                titleType='nunito-regular'
                onChangeText={(value) => field.onChange(value)}
                style={styles.input}
                showErrorText
                error={errors?.phone_number?.message}
              />
            )}
            name='phone_number'
            defaultValue=''
          />
        </View>
        <View style={styles.actionBtn}>
          <CustomButton
            title='Continue'
            textType='nunito-semibold'
            textSize={16}
            onPress={handleSubmit(onSubmit)}
            buttonType='Solid'
            bgBlack
            textWhite
            style={{
              paddingVertical: moderateScale(15),
              width: "100%",
            }}
            loaderColor={colors.white}
            isLoading={loading}
          />
        </View>
      </KeyboardDismissal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(10),
  },
  input: {
    backgroundColor: colors.white,
  },
  actionBtn: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    bottom: Platform.OS === "ios" ? moderateScale(0) : moderateScale(5),
    width: "100%",
    gap: moderateScale(20),
  },
});
