import React from "react";
import { useState, useEffect } from "react";
import {
  ScrollView,
  Button,
  StyleSheet,
  Text,
  View,
  Alert,
  KeyboardAvoidingView,
  FlatList,
  Dimensions,
  SafeAreaView,
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import colors from "../constants/colors";
import ListItem from "../components/ListItem";

interface GameScreenProps {
  userChoice: number;
  onGameOver: (numberOfGuesses: number) => void;
  onRestart: () => void;
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemInside: {
    width: "40%",
    alignItems: "center",
  },
  guessList: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  listCard: {
    margin: 50,
    width: 300,
    maxWidth: "80%",
  },
  card: {
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    width: 300,
    maxWidth: "80%",
  },
  screen: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: colors.primary,
    flex: 1,
    marginHorizontal: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  restartContainer: {
    marginVertical: 10,
    width: "40%",
  },
});

const makeRandomGuess: (min: number, max: number, exclude: number) => number = (
  min,
  max,
  exclude
) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndVal: number = Math.floor(Math.random() * (max - min)) + min;
  return rndVal === exclude ? makeRandomGuess(min, max, exclude) : rndVal;
};

const GameScreen: React.FC<GameScreenProps> = (props) => {
  const [lowerValue, setLowerValue] = useState<number>(1);
  const [upperValue, setUpperValue] = useState<number>(100);
  const initialGuess = makeRandomGuess(
    lowerValue,
    upperValue,
    props.userChoice
  );
  const [randomGuess, setRandomGuess] = useState<number>(initialGuess);
  const [guessList, setGuessList] = useState<Array<number>>([initialGuess]);

  const [screenWidth, setScreenWidth] = useState<number>(
    Dimensions.get("window").width
  );
  const [screenHeight, setScreenHeight] = useState<number>(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const updateLayout = () => {
      setScreenHeight(Dimensions.get("window").height);
      setScreenWidth(Dimensions.get("window").width);
    };
    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  const onLowerPress = () => {
    if (props.userChoice === randomGuess) return;
    if (props.userChoice > randomGuess) {
      Alert.alert("Cheating", "The users choice is not lower than the guess", [
        { text: "Okay", style: "destructive" },
      ]);
      return;
    }
    const upper: number = randomGuess;
    const lower: number = lowerValue;

    const newGuess = makeRandomGuess(lower, upper, -1);

    setRandomGuess(newGuess);
    setGuessList((l) => [newGuess, ...l]);
    setUpperValue(upper);
  };
  const onGreaterPress = () => {
    if (props.userChoice === randomGuess) return;
    if (props.userChoice < randomGuess) {
      Alert.alert(
        "Cheating",
        "The users choice is not greater than the guess",
        [{ text: "Okay", style: "destructive" }]
      );
      return;
    }
    const upper: number = upperValue;
    const lower: number = randomGuess + 1;
    const newGuess = makeRandomGuess(lower, upper, -1);
    setRandomGuess(newGuess);
    setGuessList((l) => [newGuess, ...l]);
    setLowerValue(lower);
  };

  if (props.userChoice === randomGuess) props.onGameOver(guessList.length - 1);

  return (
    <ScrollView
      style={{
        flexGrow: 1,
        paddingBottom: 60,
        width: screenWidth,
        height: screenHeight*0.9
      }}
    >
      <View
        style={{
          ...styles.screen,
          flexDirection: screenHeight > 500 ? "column" : "row",
          flexGrow: 1,
        }}
      >
        <Card style={styles.card}>
          <Text>Opponent's Guess</Text>
          <NumberContainer>{randomGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="LOWER"
                color={colors.primary}
                onPress={onLowerPress}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="GREATER"
                color={colors.primary}
                onPress={onGreaterPress}
              />
            </View>
          </View>
          <View style={styles.restartContainer}>
            <Button
              title="Restart"
              onPress={props.onRestart}
              color={colors.accent}
            />
          </View>
        </Card>
        <Card style={{ ...styles.listCard, height: screenHeight > 700 ? "40%" : "70%" }}>
          <FlatList
            keyExtractor={(item) => item.toString()}
            nestedScrollEnabled
            data={guessList}
            renderItem={(item) => {
              return (
                <View style={styles.listItem}>
                  <ListItem containerStyle={styles.listItemInside}>
                    {guessList.length - item.index}
                  </ListItem>
                  <ListItem containerStyle={styles.listItemInside}>
                    {item.item}
                  </ListItem>
                </View>
              );
            }}
            contentContainerStyle={styles.guessList}
          />
        </Card>
      </View>
    </ScrollView>
  );
};

export default GameScreen;
