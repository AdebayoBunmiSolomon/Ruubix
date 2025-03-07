import { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as SplashScreen from "expo-splash-screen";
import { CustomText } from "@src/components/shared";

export const SplashScreenComponent = ({
  onFinish,
}: {
  onFinish: () => void;
}) => {
  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
      setTimeout(() => {
        SplashScreen.hideAsync();
        onFinish();
      }, 10000); // Show splash for 3 seconds
    };
    prepare();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "#050505",
          "#1D112C",
          "#170B1A",
          "#2D1010",
          "#0A0105",
          "#2D1C42",
        ]}
        style={styles.container}>
        <Image
          source={require("@src/assets/png/icon.png")}
          style={styles.image}
          resizeMode='contain'
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
