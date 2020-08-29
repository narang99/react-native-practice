import React from "react";
import {
  ScrollView,
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import colors from "../constants/colors";

interface GameOverScreenProps {
  onRestart: () => void;
  numberOfGuesses: number;
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    alignItems: "center",
    flex: 1,
  },
  card: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
  imageContainer: {
    marginVertical: 30,
    height: 240,
    width: 240,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 120,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

const GameOverScreen: React.FC<GameOverScreenProps> = (props) => {
  return (
    <ScrollView>
        <View style={styles.screen}>
          <Card style={styles.card}>
            <Text style={{ fontFamily: "open-sans-bold" }}>Game Over</Text>
            <View style={styles.imageContainer}>
              <Image
                source={require("../assets/success.png")}
                resizeMode="cover"
                style={styles.image}
              />
            </View>
            <Text>Number of Guesses</Text>
            <NumberContainer>{props.numberOfGuesses}</NumberContainer>
            <Button
              title="Restart"
              onPress={props.onRestart}
              color={colors.primary}
            />
          </Card>
        </View>
    </ScrollView>
  );
};

export default GameOverScreen;
