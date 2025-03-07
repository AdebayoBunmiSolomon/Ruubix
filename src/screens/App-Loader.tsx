import React from "react";
import { Image, StyleSheet, View } from "react-native";

export const AppLoader = () => {
  return (
    <View style={loaderStyles.container}>
      <Image
        source={require("@src/assets/png/splash-icon.png")}
        style={loaderStyles.image}
        resizeMode='stretch'
      />
    </View>
  );
};

const loaderStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
