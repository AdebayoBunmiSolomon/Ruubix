import { AppHeader } from "@src/common";
import { authScreenNames } from "@src/navigation";
import { colors } from "@src/resources/colors/colors";
import { moderateScale } from "@src/resources/scaling";
import { AuthScreenProps } from "@src/router/types";
import { Screen } from "@src/screens/Screen";
import React, { useState } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPasswordFormTypes } from "@src/form/schema/types";
import { createPasswordValidationSchema } from "@src/form/validation/rules";
import { CustomInput, CustomText } from "@src/components/shared";
import { ScrollContainer } from "@src/screens/Scroll-Container";
import { PasswordRequirement } from "@src/common";
import {
  passwordRequirements,
  useCheckPasswordRequirements,
} from "@src/hooks/services/useCheckPassword";
import { CustomButton } from "@src/components/shared";

export const CreatePassword = ({
  navigation,
}: AuthScreenProps<authScreenNames.CREATE_PASSWORD>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { passwordReqMts, checkPasswordReqMts } =
    useCheckPasswordRequirements();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<createPasswordFormTypes>({
    mode: "onChange",
    resolver: yupResolver(createPasswordValidationSchema),
  });

  const onSubmit = async (data: createPasswordFormTypes) => {
    if (data) {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      navigation.navigate(authScreenNames.CREATE_PASSWORD_SUCCESS);
    }
  };

  return (
    <Screen style={styles.screen}>
      <AppHeader
        title='Create a new password'
        showGetHelp
        onPressArrowBack={() => navigation.goBack()}
      />
      <ScrollContainer style={styles.formContainer}>
        <Controller
          control={control}
          render={({ field }) => (
            <CustomInput
              title='Password'
              titleType='nunito-bold'
              titleColor={colors.black}
              value={field.value}
              onChangeText={(text) => {
                field.onChange(text);
                checkPasswordReqMts(text);
              }}
              placeholder='***********'
              type='password'
              showErrorText
              error={errors?.password?.message}
              style={styles.input}
            />
          )}
          name='password'
          defaultValue=''
        />

        <Controller
          control={control}
          render={({ field }) => (
            <CustomInput
              title='Confirm Password'
              titleType='nunito-bold'
              titleColor={colors.black}
              value={field.value}
              onChangeText={(text) => field.onChange(text)}
              placeholder='***********'
              type='password'
              showErrorText
              error={errors?.confirm_password?.message}
              style={styles.input}
            />
          )}
          name='confirm_password'
          defaultValue=''
        />
        <View>
          <CustomText type='nunito-regular' size={13} black>
            Password must be minimum 8 characters
          </CustomText>
          <View style={styles.passwordOptionContainer}>
            {passwordRequirements.map((req, index) => (
              <PasswordRequirement
                key={index}
                label={req.label}
                isMet={passwordReqMts[req.key]} // Dynamically checks the condition
              />
            ))}
          </View>
        </View>
      </ScrollContainer>
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
    height: "77%",
  },
  passwordOptionContainer: {
    gap: moderateScale(10),
    paddingVertical: moderateScale(15),
    paddingLeft: moderateScale(10),
  },
  actionBtn: {
    alignSelf: "center",
    alignItems: "center",
    bottom: Platform.OS === "ios" ? moderateScale(0) : moderateScale(5),
    width: "100%",
    gap: moderateScale(20),
  },
});
