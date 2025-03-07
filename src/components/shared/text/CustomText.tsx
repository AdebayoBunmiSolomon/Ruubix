import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { useCustomText } from "../hooks";
import { moderateScale } from "@src/resources/scaling";

export type textType =
  | "nunito-extrabold"
  | "nunito-bold"
  | "nunito-semibold"
  | "nunito-medium"
  | "nunito-regular"
  | "nunito-light"
  | "mulish-extrabold"
  | "mulish-bold"
  | "mulish-semibold"
  | "mulish-medium"
  | "mulish-regular"
  | "mulish-light";

interface ICustomTextProps {
  children: React.ReactNode;
  size: number;
  type?: textType;
  white?: boolean;
  black?: boolean;
  orange?: boolean;
  grey?: boolean;
  lightGrey?: boolean;
  darkGrey?: boolean;
  lightBlack?: boolean;
  paleRed?: boolean;
  style?: StyleProp<TextStyle>;
}

export const CustomText: React.FC<ICustomTextProps> = ({
  children,
  size,
  type,
  white,
  black,
  orange,
  grey,
  lightGrey,
  darkGrey,
  lightBlack,
  paleRed,
  style,
}) => {
  const { getFontFamily, getTextColor } = useCustomText();
  const fontFamily = getFontFamily(type ? type : "nunito-regular");
  const textColor = getTextColor(
    white,
    black,
    orange,
    grey,
    lightGrey,
    darkGrey,
    lightBlack,
    paleRed
  );
  return (
    <Text
      style={[
        {
          fontFamily: fontFamily,
          fontSize: moderateScale(size),
          color: textColor,
        },
        style,
      ]}>
      {children && children}
    </Text>
  );
};
