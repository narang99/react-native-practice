import React from "react";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  Alert,
  Dimensions,
} from "react-native";
import Card from "../components/Card";
import colors from "../constants/colors";
import CustomTextInput from "../components/CustomTextInput";
import NumberContainer from "../components/NumberContainer";

interface StartScreenProps {
  onConfirm: (value: number) => void;
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1,
    flex: 1,
  },
  confirmedTextStyle: {
    fontSize: 24,
    fontFamily: "open-sans-bold",
  },
  confirmedTextStyleContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  card: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 10,
  },
  button: {
    width: "40%",
  },
  customTextInput: {
    width: "50%",
    textAlign: "center",
  },
  cardsContainer: {
    flex: 1,
  },
});

const StartScreen: React.FC<StartScreenProps> = (props) => {
  const [enteredValue, setEnteredValue] = useState<string>("");
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [confirmedValue, setConfirmedValue] = useState<number>(0);
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

  const textInputHandler: (text: string) => void = (text) => {
    setEnteredValue(text.replace(/[^0-9]/g, ""));
  };

  const onResetButtonPress = () => {
    setEnteredValue("");
    setIsConfirmed(false);
  };


  const onConfirmButtonPress = () => {
    let val: number = parseInt(enteredValue);
    if (isNaN(val) || val <= 0 || val > 99) {
      Alert.alert("Not valid Number", "Number should be between 1 and 99", [
        { text: "Okay", style: "destructive", onPress: onResetButtonPress },
      ]);
      return;
    }
    setConfirmedValue(val);
    setIsConfirmed(true);
    Keyboard.dismiss();
  };

  const onStartGameButtonPress: () => void = () => {
    props.onConfirm(confirmedValue);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            ...styles.screen,
            flexDirection: screenHeight > 500 ? "column" : "row",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Card style={styles.card}>
              <Text style={styles.title}>Start New Game</Text>
              <Text>Select a number</Text>
              <CustomTextInput
                style={styles.customTextInput}
                textInputProps={{
                  autoCorrect: false,
                  keyboardType: "number-pad",
                  autoCapitalize: "none",
                  blurOnSubmit: true,
                  value: enteredValue,
                  onChangeText: textInputHandler,
                  maxLength: 2,
                }}
              />
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button
                    color={colors.accent}
                    title="Reset"
                    onPress={onResetButtonPress}
                  />
                </View>
                <View style={styles.button}>
                  <Button
                    color={colors.primary}
                    title="Confirm"
                    onPress={onConfirmButtonPress}
                  />
                </View>
              </View>
            </Card>
          </View>

          <View>
            {isConfirmed ? (
              <Card style={{ ...styles.card, marginTop: 20 }}>
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Text>Chosen Number</Text>
                  <NumberContainer>{confirmedValue}</NumberContainer>
                </View>
                <View>
                  <Button
                    title="Start Game"
                    onPress={onStartGameButtonPress}
                    color={colors.primary}
                  />
                </View>
              </Card>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default StartScreen;
