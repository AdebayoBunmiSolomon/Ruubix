import React from "react";
import { StyleSheet, View } from "react-native";
import { OctagonAlert } from "lucide-react-native";
import { colors } from "@src/resources/colors/colors";
import { moderateScale } from "@src/resources/scaling";
import { CustomText } from "@src/components/shared";

interface IInfoCardProps {
  text: string;
}

export const InfoCard: React.FC<IInfoCardProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <OctagonAlert color={colors.black} size={moderateScale(15)} />
      <CustomText type='nunito-semibold' size={11} black>
        <CustomText type='nunito-bold' size={12} black>
          {text.split(":")[0]}:
        </CustomText>
        {text.split(":")[1]}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.paleRed,
    borderRadius: moderateScale(10),
    width: "101%",
    overflow: "hidden",
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    gap: moderateScale(6),
    marginBottom: moderateScale(20),
  },
});
