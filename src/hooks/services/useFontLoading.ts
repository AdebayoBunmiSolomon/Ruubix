import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import {
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";
import {
  Mulish_300Light,
  Mulish_400Regular,
  Mulish_500Medium,
  Mulish_600SemiBold,
  Mulish_700Bold,
  Mulish_800ExtraBold,
} from "@expo-google-fonts/mulish";
import { fontFamily } from "@src/resources/fonts/font-family";

export const useFontLoading = () => {
  const [fontsLoaded] = useFonts({
    [fontFamily.nunito_extrabold]: Nunito_800ExtraBold,
    [fontFamily.nunito_bold]: Nunito_700Bold,
    [fontFamily.nunito_semibold]: Nunito_600SemiBold,
    [fontFamily.nunito_medium]: Nunito_500Medium,
    [fontFamily.nunito_regular]: Nunito_400Regular,
    [fontFamily.nunito_light]: Nunito_300Light,
    [fontFamily.mulish_bold]: Mulish_700Bold,
    [fontFamily.mulish_semibold]: Mulish_600SemiBold,
    [fontFamily.mulish_medium]: Mulish_500Medium,
    [fontFamily.mulish_regular]: Mulish_400Regular,
    [fontFamily.mulish_light]: Mulish_300Light,
    [fontFamily.mulish_extrabold]: Mulish_800ExtraBold,
  });

  const [isFontLoadingComplete, setIsFontLoadingComplete] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => {
        setIsFontLoadingComplete(true);
      }, 5000); // ⏳ Delay for 5 seconds

      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [fontsLoaded]);

  return { isFontLoadingComplete };
};
