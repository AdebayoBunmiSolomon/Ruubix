import React, { useState } from "react";
import { Screen } from "@src/screens/Screen";
import { AuthScreenProps } from "@src/router/types";
import { authScreenNames } from "@src/navigation";
import { Alert, StyleSheet, View } from "react-native";
import { colors } from "@src/resources/colors/colors";
import { DVH, DVW, moderateScale } from "@src/resources/scaling";
import { AppHeader, OTPInput } from "@src/common";
import { CustomButton, CustomText } from "@src/components/shared";
import { InfoCard } from "@src/components/auth/sign-up";

export const SetUpPin = ({
  navigation,
}: AuthScreenProps<authScreenNames.SET_UP_PIN>) => {
  const [otpValue1, setOtpValue1] = useState<string>("");
  const [otpValue2, setOtpValue2] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const verifyPin = async () => {
    if (otpValue1.length === 4 && otpValue2.length === 4) {
      if (otpValue1 !== otpValue2) {
        Alert.alert("Pin Error", "Pin do not match");
        return;
      }
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      navigation.navigate(authScreenNames.LOGIN);
    }
  };

  return (
    <Screen style={styles.screen}>
      <AppHeader
        title='Setup Pin'
        onPressArrowBack={() => navigation.goBack()}
        showGetHelp
      />
      <InfoCard
        text={
          "Identification: Kindly upload all required document to\nto complete your account set up"
        }
      />
      <View style={styles.otpContainer}>
        <CustomText
          type='nunito-regular'
          size={16}
          style={{
            color: "#54534A",
          }}>
          Enter a 4-digit pin
        </CustomText>
        <OTPInput
          numberOfInput={4}
          onComplete={(otp) => setOtpValue1(otp)}
          inputStyle={styles.otp}
          containerStyle={styles.otpContainerStyle}
        />
      </View>

      <View style={styles.otpContainer}>
        <CustomText
          type='nunito-regular'
          size={16}
          style={{
            color: "#54534A",
          }}>
          Confirm 4-digit pin
        </CustomText>
        <OTPInput
          numberOfInput={4}
          onComplete={(otp) => setOtpValue2(otp)}
          inputStyle={styles.otp}
          containerStyle={styles.otpContainerStyle}
        />
      </View>

      <CustomButton
        title='Continue to Dashboard'
        textType='nunito-semibold'
        textSize={16}
        onPress={async () => await verifyPin()}
        buttonType='Solid'
        bgBlack
        textWhite
        style={{
          marginTop: moderateScale(40),
          paddingVertical: moderateScale(15),
          width: "100%",
        }}
        isLoading={loading}
        loaderColor={colors.white}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(10),
  },
  otp: {
    width: DVW(13),
    height: DVH(8),
  },
  otpContainerStyle: {
    width: "70%",
    alignSelf: "center",
  },
  otpContainer: {
    gap: moderateScale(10),
    paddingVertical: moderateScale(10),
  },
});
