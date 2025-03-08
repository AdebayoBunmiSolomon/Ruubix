import { AppHeader, OTPInput } from "@src/common";
import { authScreenNames } from "@src/navigation";
import { colors } from "@src/resources/colors/colors";
import { DVH, DVW, moderateScale } from "@src/resources/scaling";
import { AuthScreenProps } from "@src/router/types";
import { KeyboardDismissal } from "@src/screens/Keyboard-Dismissal";
import { Screen } from "@src/screens/Screen";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Platform, TouchableOpacity } from "react-native";
import { CustomButton, CustomText } from "@src/components/shared";
import { useCountDown } from "@src/hooks/services";
import { useEnteredPhoneNumberStore } from "@src/hooks/store";

export const SignUpVerifyPhoneNumber = ({
  navigation,
}: AuthScreenProps<authScreenNames.SIGN_UP_VERIFY_PHONE_NUMBER>) => {
  const { enteredPhoneNumber } = useEnteredPhoneNumberStore();
  const [otpValue, setOtpValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { minutes, seconds, resetCountdown } = useCountDown(2, 60);

  useEffect(() => {
    const initiateVerify = async () => {
      if (otpValue.length === 6) {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
        navigation.navigate(authScreenNames.CREATE_ACCOUNT);
      }
    };

    initiateVerify(); // Call the function inside useEffect
  }, [otpValue]);

  return (
    <Screen style={styles.screen}>
      <AppHeader
        title='Confirm your phone number'
        description={`Enter the 6-digit code sent to ${enteredPhoneNumber}`}
        onPressArrowBack={() => navigation.goBack()}
      />
      <KeyboardDismissal>
        <OTPInput
          numberOfInput={6}
          onComplete={(otp) => setOtpValue(otp)}
          inputStyle={styles.otp}
        />
        <View style={styles.infoTextContainer}>
          {minutes <= 0 ? (
            <TouchableOpacity
              onPress={() => {
                resetCountdown();
              }}>
              <CustomText type='mulish-regular' size={16} black>
                Resend Code
              </CustomText>
            </TouchableOpacity>
          ) : (
            <CustomText type='nunito-regular' size={16} black>
              {`Expires in ${String(minutes).padStart(2, "0")}:${String(
                seconds
              ).padStart(2, "0")}`}
            </CustomText>
          )}

          <TouchableOpacity style={styles.changePhonNumberBtn}>
            <CustomText type='mulish-regular' size={16} black>
              Change Phone Number
            </CustomText>
          </TouchableOpacity>
        </View>
        <View style={styles.actionBtn}>
          <CustomButton
            title='Continue'
            textType='nunito-semibold'
            textSize={16}
            onPress={async () => {
              if (otpValue.length === 6) {
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setLoading(false);
                navigation.navigate(authScreenNames.CREATE_ACCOUNT);
              }
            }}
            buttonType='Solid'
            bgBlack
            textWhite
            style={{
              paddingVertical: moderateScale(15),
              width: "100%",
            }}
            isLoading={loading}
            loaderColor={colors.white}
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
  otp: {
    width: DVW(13),
    height: DVH(8),
  },
  actionBtn: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    bottom: Platform.OS === "ios" ? moderateScale(0) : moderateScale(5),
    width: "100%",
    gap: moderateScale(20),
  },
  infoTextContainer: {
    paddingVertical: moderateScale(50),
    width: "100%",
    gap: moderateScale(30),
    justifyContent: "center",
    alignItems: "center",
  },
  changePhonNumberBtn: {
    paddingVertical: moderateScale(5),
  },
});
