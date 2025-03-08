import React from "react";
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { CustomText, textType } from "../text/CustomText";
import { moderateScale } from "@src/resources/scaling";
import { useCustomButton, useCustomText } from "../hooks";
import { Loader } from "@src/common";

export type buttonType = "Outline" | "Solid";

interface ICustomButtonProps {
  title: string;
  onPress: () => void;
  textType: textType;
  buttonType: buttonType;
  textSize?: number;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  isLoading?: boolean;
  loaderColor?: string;
  bgWhite?: boolean;
  bgBlack?: boolean;
  bgOrange?: boolean;
  bgGrey?: boolean;
  bgLightGrey?: boolean;
  bgDarkGrey?: boolean;
  bgLightBlack?: boolean;
  bgPaleRed?: boolean;
  textWhite?: boolean;
  textBlack?: boolean;
  textOrange?: boolean;
  textGrey?: boolean;
  textLightGrey?: boolean;
  textDarkGrey?: boolean;
  textLightBlack?: boolean;
  textPaleRed?: boolean;
  style?: StyleProp<ViewStyle>;
  textColorValue?: ColorValue;
  disabled?: boolean;
}

export const CustomButton: React.FC<ICustomButtonProps> = ({
  title,
  onPress,
  textType,
  buttonType,
  textSize,
  rightIcon,
  leftIcon,
  isLoading,
  loaderColor,
  bgWhite,
  bgBlack,
  bgOrange,
  bgGrey,
  bgLightGrey,
  bgDarkGrey,
  bgLightBlack,
  bgPaleRed,
  textWhite,
  textBlack,
  textOrange,
  textGrey,
  textLightGrey,
  textDarkGrey,
  textLightBlack,
  textPaleRed,
  style,
  textColorValue,
  disabled,
}) => {
  const { getTextColor } = useCustomText();
  const { getButtonColor } = useCustomButton();
  const textColor = getTextColor(
    textWhite,
    textBlack,
    textOrange,
    textGrey,
    textLightGrey,
    textDarkGrey,
    textLightBlack,
    textPaleRed
  );
  const btnBgColor = getButtonColor(
    bgWhite,
    bgBlack,
    bgOrange,
    bgGrey,
    bgLightGrey,
    bgDarkGrey,
    bgLightBlack,
    bgPaleRed
  );
  return (
    <>
      {buttonType === "Solid" ? (
        <TouchableOpacity
          onPress={onPress}
          style={[
            buttonStyles.container,
            {
              backgroundColor: btnBgColor,
              borderRadius: moderateScale(35),
            },
            style,
          ]}
          disabled={isLoading ? true : disabled}>
          {isLoading ? (
            <Loader size='small' color={String(loaderColor)} />
          ) : (
            <>
              {leftIcon && leftIcon}
              <CustomText
                size={textSize ? textSize : moderateScale(14)}
                type={textType}
                style={{ color: textColor || textColorValue }}>
                {title}
              </CustomText>
              {rightIcon && rightIcon}
            </>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onPress}
          style={[
            buttonStyles.container,
            {
              borderRadius: moderateScale(35),
              borderColor: btnBgColor,
              borderWidth: moderateScale(2),
            },
            style,
          ]}
          disabled={isLoading ? true : disabled}>
          {isLoading ? (
            <Loader size='small' color={String(loaderColor)} />
          ) : (
            <>
              {leftIcon && leftIcon}
              <CustomText
                size={textSize ? textSize : moderateScale(14)}
                type={textType}
                style={{
                  color: textColor || textColorValue,
                }}>
                {title}
              </CustomText>
              {rightIcon && rightIcon}
            </>
          )}
        </TouchableOpacity>
      )}
    </>
  );
};

const buttonStyles = StyleSheet.create({
  container: {
    width: "95%",
    paddingVertical: moderateScale(12),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: moderateScale(5),
  },
});
