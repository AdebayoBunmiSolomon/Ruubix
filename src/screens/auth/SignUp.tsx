import { authScreenNames } from "@src/navigation";
import { AuthScreenProps } from "@src/router/types";
import React from "react";
import { Screen } from "../Screen";
import { AppHeader } from "@src/common";
import { StyleSheet } from "react-native";
import { moderateScale } from "@src/resources/scaling";
import { colors } from "@src/resources/colors/colors";

export const SignUp = ({
  navigation,
}: AuthScreenProps<authScreenNames.SIGN_UP>) => {
  return (
    <Screen style={styles.screen}>
      <AppHeader
        title='Get Started'
        onPressArrowBack={() => navigation.goBack()}
        showGetHelp
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: moderateScale(10),
    backgroundColor: colors.white,
  },
});
