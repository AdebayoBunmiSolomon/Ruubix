import { colors } from "@src/resources/colors/colors";
import { fontFamily } from "@src/resources/fonts/font-family";
import { textType } from "../text/CustomText";

export const useCustomText = () => {
  const getFontFamily = (type: textType) => {
    if (type === "mulish-bold") {
      return fontFamily.mulish_bold;
    } else if (type === "mulish-extrabold") {
      return fontFamily.mulish_extrabold;
    } else if (type === "mulish-semibold") {
      return fontFamily.mulish_semibold;
    } else if (type === "mulish-medium") {
      return fontFamily.mulish_medium;
    } else if (type === "mulish-regular") {
      return fontFamily.mulish_regular;
    } else if (type === "mulish-light") {
      return fontFamily.mulish_light;
    } else if (type === "nunito-extrabold") {
      return fontFamily.nunito_extrabold;
    } else if (type === "nunito-bold") {
      return fontFamily.nunito_bold;
    } else if (type === "nunito-semibold") {
      return fontFamily.mulish_semibold;
    } else if (type === "nunito-medium") {
      return fontFamily.nunito_medium;
    } else if (type === "nunito-regular") {
      return fontFamily.nunito_regular;
    } else if (type === "nunito-light") {
      return fontFamily.nunito_light;
    }
  };

  const getTextColor = (
    white?: boolean,
    black?: boolean,
    orange?: boolean,
    grey?: boolean,
    lightGrey?: boolean,
    darkGrey?: boolean,
    lightBlack?: boolean,
    paleRed?: boolean
  ) => {
    if (white) {
      return colors?.white;
    } else if (black) {
      return colors.black;
    } else if (orange) {
      return colors.orange;
    } else if (grey) {
      return colors.grey;
    } else if (lightGrey) {
      return colors?.lightGrey;
    } else if (darkGrey) {
      return colors.darkGrey;
    } else if (lightBlack) {
      return colors?.lightBlack;
    } else if (paleRed) {
      return colors.paleRed;
    }
  };

  return {
    getFontFamily,
    getTextColor,
  };
};
