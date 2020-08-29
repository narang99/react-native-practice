import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import StartScreen from "./screens/StartScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import * as Font from "expo-font";
import { AppLoading } from "expo";

interface AppProps {}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

enum ScreenType {
  START,
  END,
  ONGOING,
};

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const App: React.FC<AppProps> = (props) => {
  const [confirmedNumber, setConfirmedNumber] = useState<number>(0);
  const [screenType, setScreenType] = useState<ScreenType>(ScreenType.START);
  const [numberOfGuesses, setNumberOfGuesses] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  if(!isLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts}
        onFinish={() => setIsLoaded(true)}
        onError={(err) => console.log("SHIT. couldnt load fonts")}
      />
    )
  }

  const onConfirmInStartScreen: (value: number) => void = (value) => {
    setConfirmedNumber(value);
    setScreenType(ScreenType.ONGOING);
  };
  const onRestart = () => {
    setScreenType(ScreenType.START);
    setConfirmedNumber(0);
    setNumberOfGuesses(0);
  };

  const onGameOver: (guesses: number) => void = (guesses) => {
    setScreenType(ScreenType.END);
    setNumberOfGuesses(guesses);
  };

  let content: JSX.Element;
  if (screenType === ScreenType.START)
    content = <StartScreen onConfirm={onConfirmInStartScreen} />;
  else if (screenType === ScreenType.ONGOING)
    content = (
      <GameScreen
        userChoice={confirmedNumber}
        onRestart={onRestart}
        onGameOver={onGameOver}
      />
    );
  else
    content = (
      <GameOverScreen onRestart={onRestart} numberOfGuesses={numberOfGuesses} />
    );

  return (
    <View style={styles.root}>
      <Header title="Guess the Number" />
      {content}
    </View>
  );
};

export default App;
