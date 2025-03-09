import React from "react";
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { CustomText } from "../text/CustomText";
import { DVH, DVW, moderateScale } from "@src/resources/scaling";

interface IUploadButtonProps {
  title: string;
  btnTitle: string;
  btnDesc: string;
  btnIconSrc?: ImageSourcePropType;
  upload: () => void;
}

export const UploadButton: React.FC<IUploadButtonProps> = ({
  title,
  btnTitle,
  btnDesc,
  btnIconSrc,
  upload,
}) => {
  return (
    <View style={styles.container}>
      <CustomText type='nunito-semibold' size={14} black>
        {title}
      </CustomText>
      <TouchableOpacity style={styles.uploadBtn} onPress={() => upload()}>
        <CustomText type='nunito-bold' size={14} black>
          {btnTitle}
        </CustomText>
        <View style={styles.titleDescContainer}>
          <CustomText
            type='nunito-medium'
            size={10}
            style={{
              color: "#7B7F99",
            }}>
            {btnDesc}
          </CustomText>
          <Image
            source={btnIconSrc || require("@src/assets/png/Upload.png")}
            style={{
              width: DVW(7),
              height: DVH(3.5),
              alignSelf: "flex-start",
            }}
            resizeMode='contain'
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: moderateScale(5),
  },
  uploadBtn: {
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(15),
    backgroundColor: "#F1F1F1",
    gap: moderateScale(5),
  },
  titleDescContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: moderateScale(5),
  },
});
