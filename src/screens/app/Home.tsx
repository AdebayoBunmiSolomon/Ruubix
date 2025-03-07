import React from "react";
import { Screen } from "../Screen";
import { CustomText } from "@src/components/shared";

export const Home = () => {
  return (
    <Screen>
      <CustomText type='nunito-bold' size={40} black>
        Home screen
      </CustomText>
    </Screen>
  );
};
