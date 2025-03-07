import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { appScreens } from "@src/navigation";
import React from "react";

const ScreenStack = createNativeStackNavigator<RootStackParamList>();
const headerOptions: NativeStackNavigationOptions = { headerShown: false };

const Screen = () => {
  return (
    <ScreenStack.Navigator screenOptions={headerOptions}>
      {appScreens &&
        appScreens.map((screen, index) => (
          <ScreenStack.Screen
            name={screen.screenName}
            key={index}
            component={screen.component}
          />
        ))}
    </ScreenStack.Navigator>
  );
};

export const AppStack = () => {
  return (
    <>
      <Screen />
    </>
  );
};
