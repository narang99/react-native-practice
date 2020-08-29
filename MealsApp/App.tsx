import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import MealsNavigator from './navigation/MealsNavigator';
import { enableScreens } from "react-native-screens";

enableScreens();
interface AppProps {}

const fetchFonts: () => Promise<void> = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const App: React.FC<AppProps> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  if(isLoading) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setIsLoading(false)} />;

  }
  return <MealsNavigator />;
};

export default App;
