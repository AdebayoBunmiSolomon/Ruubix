import { moderateScale } from "@src/resources/scaling";
import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface IScreenProps {
  bgColor?: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Screen: React.FC<IScreenProps> = ({
  bgColor,
  children,
  style,
}) => {
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: bgColor }, style]}>
      {children && children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(7),
    paddingVertical: moderateScale(5.5),
  },
});
