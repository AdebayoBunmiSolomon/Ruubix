import { appScreenTypes } from "@src/types/types";
import { appScreenNames } from "./navigation-names";
import { Home } from "@src/screens/app";

export const appScreens: appScreenTypes[] = [
  //this houses the bottom tab screens and drawer screens
  {
    screenName: appScreenNames.HOME,
    component: Home,
  },
];
