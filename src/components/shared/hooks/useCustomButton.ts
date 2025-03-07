import { colors } from "@src/resources/colors/colors";

export const useCustomButton = () => {
  const getButtonColor = (
    bgWhite?: boolean,
    bgBlack?: boolean,
    bgOrange?: boolean,
    bgGrey?: boolean,
    bgLightGrey?: boolean,
    bgDarkGrey?: boolean,
    bgLightBlack?: boolean,
    bgPaleRed?: boolean
  ) => {
    if (bgWhite) {
      return colors?.white;
    } else if (bgBlack) {
      return colors?.black;
    } else if (bgOrange) {
      return colors?.orange;
    } else if (bgGrey) {
      return colors?.grey;
    } else if (bgLightGrey) {
      return colors.lightGrey;
    } else if (bgDarkGrey) {
      return colors.darkGrey;
    } else if (bgLightBlack) {
      return colors.lightBlack;
    } else if (bgPaleRed) {
      return colors.paleRed;
    }
  };

  return {
    getButtonColor,
  };
};
