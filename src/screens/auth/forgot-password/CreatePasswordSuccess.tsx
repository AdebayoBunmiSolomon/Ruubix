import { CustomText, CustomButton } from "@src/components/shared";
import { authScreenNames } from "@src/navigation";
import { colors } from "@src/resources/colors/colors";
import { DVH, DVW, moderateScale } from "@src/resources/scaling";
import { AuthScreenProps } from "@src/router/types";
import { Screen } from "@src/screens/Screen";
import React from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";

export const CreatePasswordSuccess = ({
  navigation,
}: AuthScreenProps<authScreenNames.CREATE_PASSWORD_SUCCESS>) => {
  return (
    <Screen style={styles.screen}>
      <Image
        source={require("@src/assets/png/reset-successful-icon.png")}
        resizeMode='contain'
        style={styles.resetSuccessfulIcon}
      />
      <View style={styles.infoTextContainer}>
        <CustomText type='nunito-bold' size={22} black>
          Password reset successful
        </CustomText>
        <CustomText type='nunito-regular' size={14} black>
          {`Lorem ipsum dolor sit amet, consectetur adipiscing \n elit, sed do eiusmod tempor ullamco laboris nisi`}
        </CustomText>
        <CustomButton
          title='Log In'
          textType='nunito-semibold'
          textSize={16}
          onPress={() => navigation.navigate(authScreenNames.LOGIN)}
          buttonType='Solid'
          bgBlack
          textWhite
          style={{
            paddingVertical: moderateScale(15),
            marginVertical: moderateScale(20),
            width: "100%",
          }}
        />
      </View>
      <View style={styles.bottomImgContainer}>
        <ImageBackground
          source={require("@src/assets/png/reset-password-ruby.png")}
          style={styles.bottomImg}
          resizeMode='cover'
          tintColor={"rgb(248, 245, 265)"}>
          <CustomText
            type='nunito-bold'
            size={22}
            style={{
              color: "rgb(248, 300, 250)",
            }}>
            Password reset successful
          </CustomText>
        </ImageBackground>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(10),
    flex: 1,
    justifyContent: "center",
    marginTop: moderateScale(-100),
  },
  resetSuccessfulIcon: {
    width: DVW(50),
    height: DVH(25),
    alignSelf: "center",
  },
  infoTextContainer: {
    alignItems: "center",
    gap: moderateScale(10),
    paddingVertical: moderateScale(20),
  },
  bottomImgContainer: {
    position: "absolute",
    bottom: 0,
    alignSelf: "flex-end",
  },
  bottomImg: {
    width: "100%",
    height: DVH(25),
    overflow: "hidden",
  },
  overlayView: {
    width: "100%",
    height: "100%",
  },
});
