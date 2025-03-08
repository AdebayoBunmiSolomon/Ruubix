import React, { useState } from "react";
import { CustomButton, CustomText } from "@src/components/shared";
import ReanimatedCarousel from "react-native-reanimated-carousel";
import { AuthScreenProps } from "@src/router/types";
import { authScreenNames } from "@src/navigation";
import { ImageBackground, Platform, StyleSheet, View } from "react-native";
import {
  DVW,
  moderateScale,
  screenWidth,
  verticalScale,
} from "@src/resources/scaling";
import { ChevronDown } from "lucide-react-native";
import { colors } from "@src/resources/colors/colors";
import { onboardingSlides } from "@src/constants/onboarding";

export const Onboarding = ({
  navigation,
}: AuthScreenProps<authScreenNames.ONBOARDING>) => {
  const [currIndex, setCurrIndex] = useState<number>(0);
  return (
    <View style={styles.container}>
      <ReanimatedCarousel
        data={onboardingSlides}
        renderItem={({ item, index }) => (
          <ImageBackground
            key={index}
            source={item.image}
            resizeMode='stretch'
            style={styles.imgBg}>
            <View style={styles.imgBckgContent}>
              <CustomButton
                title='Language'
                textType='nunito-bold'
                onPress={() => {}}
                buttonType='Outline'
                rightIcon={
                  <ChevronDown color={colors.black} size={moderateScale(25)} />
                }
                style={styles.langBtn}
              />
              <View
                style={{
                  paddingVertical: moderateScale(200),
                }}>
                <CustomText
                  type='nunito-extrabold'
                  size={40}
                  black
                  style={{
                    fontWeight: Platform.OS === "ios" ? undefined : "900",
                  }}>
                  {item?.title}
                </CustomText>
                <CustomText type='nunito-medium' size={16} black>
                  {item?.description}
                </CustomText>
              </View>
            </View>
          </ImageBackground>
        )}
        onSnapToItem={(index) => setCurrIndex(index)}
        pagingEnabled={true}
        width={screenWidth}
        loop={false}
        scrollAnimationDuration={500}
      />
      <View style={styles.actionBtn}>
        <View style={styles.carousel}>
          {onboardingSlides &&
            onboardingSlides.map((__, index) => (
              <View
                key={index}
                style={{
                  padding:
                    index === currIndex ? moderateScale(8) : moderateScale(4),
                  borderRadius: moderateScale(100),
                  backgroundColor:
                    index === currIndex ? colors.black : colors.darkGrey,
                }}
              />
            ))}
        </View>
        <CustomButton
          title='Create an account'
          textType='nunito-semibold'
          textSize={16}
          onPress={() =>
            navigation.navigate(authScreenNames.SIGN_UP_PHONE_NUMBER)
          }
          buttonType='Solid'
          bgBlack
          textWhite
          style={{
            paddingVertical: moderateScale(15),
          }}
        />
        <CustomButton
          title='Login'
          textType='nunito-semibold'
          textSize={16}
          onPress={() => navigation.navigate(authScreenNames.LOGIN)}
          buttonType='Solid'
          bgWhite
          textBlack
          style={{
            paddingVertical: moderateScale(15),
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBg: {
    width: "100%",
    height: "100%",
  },
  actionBtn: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    bottom: Platform.OS === "ios" ? moderateScale(30) : moderateScale(20),
    width: "100%",
    gap: moderateScale(20),
  },
  langBtn: {
    width: "35%",
    paddingVertical: moderateScale(4),
    justifyContent: "space-around",
    paddingHorizontal: moderateScale(7),
    alignSelf: "center",
    borderWidth: DVW(0.4),
  },
  imgBckgContent: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? verticalScale(50) : verticalScale(60),
    paddingHorizontal: moderateScale(8),
  },
  carousel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: moderateScale(5),
    paddingTop: moderateScale(100),
    paddingBottom: moderateScale(20),
  },
});
