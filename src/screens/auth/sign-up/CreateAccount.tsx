import { AppHeader } from "@src/common";
import { InfoCard } from "@src/components/auth/sign-up";
import { authScreenNames } from "@src/navigation";
import { colors } from "@src/resources/colors/colors";
import { moderateScale } from "@src/resources/scaling";
import { AuthScreenProps } from "@src/router/types";
import { Screen } from "@src/screens/Screen";
import React from "react";
import { StyleSheet } from "react-native";

export const CreateAccount = ({
  navigation,
}: AuthScreenProps<authScreenNames.CREATE_ACCOUNT>) => {
  return (
    <Screen style={styles.screen}>
      <AppHeader
        title='Create your account'
        showGetHelp
        onPressArrowBack={() => navigation.goBack()}
        showProgress
        currStep={3}
        totalStep={3}
      />
      <InfoCard text='Basic Information: Kindly provide accurate information, double check before submitting' />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(10),
  },
});
