import { colors } from "@src/resources/colors/colors";
import { useState } from "react";

interface ISelectedCountryProps {
  currency: string;
  flag: string;
}

export const useCustomInput = () => {
  const [selectedCountry, setSelectedCountry] = useState<ISelectedCountryProps>(
    {
      currency: "",
      flag: "",
    }
  );
  const getInputColor = (error: string) => {
    if (error) {
      return {
        borderColor: colors.danger,
        iconColor: colors?.danger,
      };
    } else {
      return {
        borderColor: colors.darkGrey,
        iconColor: colors.darkGrey,
      };
    }
  };

  return {
    getInputColor,
    selectedCountry,
    setSelectedCountry,
  };
};
